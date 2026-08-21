package com.interviewportal.config;

import com.interviewportal.security.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(new CorsConfig().corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth

                        // Public endpoints
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/gemini/**").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Student-only
                        .requestMatchers("/dashboard").hasRole("student")
                        .requestMatchers("/attempts").hasAnyRole("student", "trainer", "admin")
                        .requestMatchers(HttpMethod.POST, "/attempts").hasRole("student")
                        .requestMatchers(HttpMethod.POST, "/mock-interviews").hasRole("student")

                        // Trainer + Admin
                        .requestMatchers("/attempts/all").hasAnyRole("trainer", "admin")
                        .requestMatchers("/mock-interviews/all").hasAnyRole("trainer", "admin")
                        .requestMatchers("/performance-reports").hasAnyRole("trainer", "admin")

                        // ===========================
                        // Assessment APIs
                        // ===========================
                        .requestMatchers(HttpMethod.GET, "/assessments/**")
                        .hasAnyRole("student", "trainer", "admin")
                        .requestMatchers(HttpMethod.POST, "/assessments").hasRole("admin")
                        .requestMatchers(HttpMethod.PUT, "/assessments/**").hasRole("admin")
                        .requestMatchers(HttpMethod.DELETE, "/assessments/**").hasRole("admin")

                        // ===========================
                        // Question APIs
                        // ===========================
                        .requestMatchers(HttpMethod.GET, "/questions/**")
                        .hasAnyRole("student", "trainer", "admin")
                        .requestMatchers(HttpMethod.POST, "/questions").hasRole("admin")
                        .requestMatchers(HttpMethod.PUT, "/questions/**").hasRole("admin")
                        .requestMatchers(HttpMethod.DELETE, "/questions/**").hasRole("admin")

                        // Admin-only
                        .requestMatchers("/users/**").hasRole("admin")
                        .requestMatchers("/analytics/admin").hasRole("admin")

                        // All authenticated users
                        .anyRequest().authenticated()
                )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .authenticationProvider(authenticationProvider())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
