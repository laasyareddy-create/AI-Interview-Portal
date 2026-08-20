-- ─────────────────────────────────────────────────────────────
-- Interview Portal – Seed Data
-- Runs once on startup when spring.sql.init.mode=always
-- INSERT IGNORE prevents duplicate inserts on restart
-- ─────────────────────────────────────────────────────────────

-- ── REACT – EASY ──────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('react','easy','What is JSX in React?','["A JavaScript extension for XML-like syntax","A styling framework","A backend language","A database query language"]','A JavaScript extension for XML-like syntax','mcq'),
('react','easy','Which hook is used to manage state in a functional component?','["useEffect","useRef","useState","useContext"]','useState','mcq'),
('react','easy','What does the useEffect hook do?','["Manages state","Handles side effects","Styles components","Routes pages"]','Handles side effects','mcq'),
('react','easy','What is a React component?','["A CSS class","A reusable piece of UI","A database model","A server endpoint"]','A reusable piece of UI','mcq'),
('react','easy','How do you pass data to a child component?','["Via state","Via props","Via context only","Via refs"]','Via props','mcq'),
('react','easy','What is the virtual DOM?','["A real DOM copy in memory","An in-memory representation of the real DOM","A browser API","A CSS engine"]','An in-memory representation of the real DOM','mcq'),
('react','easy','Which method is called after a component renders?','["componentWillMount","componentDidMount","componentWillReceiveProps","render"]','componentDidMount','mcq'),
('react','easy','What does key prop help with in lists?','["Styling","Unique identification for efficient re-renders","State management","Event handling"]','Unique identification for efficient re-renders','mcq'),
('react','easy','What is a controlled component?','["A component without state","A component whose form data is handled by React state","A component with only props","A read-only component"]','A component whose form data is handled by React state','mcq'),
('react','easy','What does React.Fragment do?','["Creates a new DOM node","Groups children without extra DOM nodes","Adds a div wrapper","Handles routing"]','Groups children without extra DOM nodes','mcq');

-- ── REACT – MEDIUM ────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('react','medium','What is the purpose of useCallback?','["Create side effects","Memoize a function reference","Create derived state","Fetch data"]','Memoize a function reference','mcq'),
('react','medium','What does useMemo do?','["Caches a function","Memoizes a computed value","Creates a ref","Manages context"]','Memoizes a computed value','mcq'),
('react','medium','What is React Context used for?','["Managing local component state","Sharing state across the component tree without prop drilling","Styling components","Handling HTTP requests"]','Sharing state across the component tree without prop drilling','mcq'),
('react','medium','What is the difference between state and props?','["No difference","Props are read-only external data; state is mutable internal data","State is external, props are internal","Both are mutable"]','Props are read-only external data; state is mutable internal data','mcq'),
('react','medium','When does useEffect with an empty dependency array run?','["On every render","Only on unmount","Only after the first render","Never"]','Only after the first render','mcq'),
('react','medium','What is React.memo?','["A hook for memoization","A HOC that prevents re-render if props are unchanged","A context provider","A routing utility"]','A HOC that prevents re-render if props are unchanged','mcq'),
('react','medium','What is prop drilling?','["Passing props many levels deep","A performance optimization","A hook pattern","A build tool"]','Passing props many levels deep','mcq'),
('react','medium','What is a custom hook?','["A built-in React hook","A function starting with use that encapsulates reusable hook logic","A class component lifecycle","An event handler"]','A function starting with use that encapsulates reusable hook logic','mcq'),
('react','medium','What does useRef return?','["A state value","A mutable ref object with a .current property","A context value","A callback"]','A mutable ref object with a .current property','mcq'),
('react','medium','What is code splitting in React?','["Separating CSS","Dynamically loading parts of the app to reduce bundle size","Splitting components across files","Minification"]','Dynamically loading parts of the app to reduce bundle size','mcq');

-- ── REACT – HARD ──────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('react','hard','What is the reconciliation algorithm in React?','["A state management pattern","The process React uses to diff the virtual DOM and update the real DOM efficiently","A CSS algorithm","A routing algorithm"]','The process React uses to diff the virtual DOM and update the real DOM efficiently','mcq'),
('react','hard','What are render props?','["Normal JSX props","A pattern where a prop is a function that returns JSX for sharing logic","Only string props","Props passed to the DOM"]','A pattern where a prop is a function that returns JSX for sharing logic','mcq'),
('react','hard','What is the useReducer hook best suited for?','["Simple boolean flags","Complex state logic with multiple sub-values or transitions","Side effects","DOM refs"]','Complex state logic with multiple sub-values or transitions','mcq'),
('react','hard','What causes unnecessary re-renders?','["Using key props","New object/function references created on every render passed as props","Using fragments","Using portals"]','New object/function references created on every render passed as props','mcq'),
('react','hard','What is React Suspense?','["A performance profiler","A component for declaratively specifying loading states while awaiting async data","A routing guard","A form library"]','A component for declaratively specifying loading states while awaiting async data','mcq'),
('react','hard','What is the Fiber architecture?','["A CSS-in-JS library","React''s reimplemented reconciliation engine enabling incremental rendering","A bundler","A state manager"]','React''s reimplemented reconciliation engine enabling incremental rendering','mcq'),
('react','hard','What is a Higher-Order Component (HOC)?','["A component with a height style","A function that takes a component and returns an enhanced component","A context consumer","A render prop"]','A function that takes a component and returns an enhanced component','mcq'),
('react','hard','What is the purpose of ReactDOM.createPortal?','["Create a new React root","Render children into a DOM node outside the parent component hierarchy","Mount the app","Lazy load components"]','Render children into a DOM node outside the parent component hierarchy','mcq'),
('react','hard','How does batching work in React 18?','["No batching","State updates inside event handlers are batched; React 18 extends batching to async operations","Only class components batch","Batching must be manual"]','State updates inside event handlers are batched; React 18 extends batching to async operations','mcq'),
('react','hard','What is the difference between useLayoutEffect and useEffect?','["No difference","useLayoutEffect fires synchronously after DOM mutations before paint; useEffect fires asynchronously after paint","useLayoutEffect only works in class components","useEffect is deprecated"]','useLayoutEffect fires synchronously after DOM mutations before paint; useEffect fires asynchronously after paint','mcq');

-- ── JAVASCRIPT – EASY ─────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('javascript','easy','What is the output of typeof null?','["null","undefined","object","string"]','object','mcq'),
('javascript','easy','Which keyword declares a block-scoped variable?','["var","let","function","global"]','let','mcq'),
('javascript','easy','What does === check?','["Value only","Reference only","Value and type","Type only"]','Value and type','mcq'),
('javascript','easy','What is a closure?','["A way to close a browser","A function that retains access to its outer scope after the outer function has returned","A loop structure","An array method"]','A function that retains access to its outer scope after the function has returned','mcq'),
('javascript','easy','What does Array.prototype.map do?','["Filters elements","Transforms each element and returns a new array","Reduces to a single value","Sorts elements"]','Transforms each element and returns a new array','mcq'),
('javascript','easy','What is NaN?','["Null value","A number type representing an undefined numeric result","An error object","Undefined"]','A number type representing an undefined numeric result','mcq'),
('javascript','easy','How do you convert a string to an integer?','["Number()","parseInt()","toString()","String()"]','parseInt()','mcq'),
('javascript','easy','What is the purpose of JSON.stringify?','["Parse JSON","Convert object to JSON string","Create a copy","Compare objects"]','Convert object to JSON string','mcq'),
('javascript','easy','What does the spread operator (...) do?','["Deletes elements","Expands iterables into individual elements","Loops over arrays","Declares functions"]','Expands iterables into individual elements','mcq'),
('javascript','easy','What are template literals?','["Regular strings","Strings with embedded expressions using backticks","CSS templates","HTML templates"]','Strings with embedded expressions using backticks','mcq');

-- ── JAVASCRIPT – MEDIUM ───────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('javascript','medium','What is the event loop?','["A CSS loop","The mechanism that handles asynchronous callbacks by managing the call stack and message queue","A for loop variant","A DOM API"]','The mechanism that handles asynchronous callbacks by managing the call stack and message queue','mcq'),
('javascript','medium','What is a Promise?','["A data type","An object representing the eventual completion or failure of an async operation","A loop","A class"]','An object representing the eventual completion or failure of an async operation','mcq'),
('javascript','medium','What does async/await do?','["Creates new threads","Provides syntactic sugar over Promises for writing async code synchronously","Blocks the main thread","Replaces callbacks with arrays"]','Provides syntactic sugar over Promises for writing async code synchronously','mcq'),
('javascript','medium','What is prototypal inheritance?','["Class-based inheritance","Objects inheriting directly from other objects via the prototype chain","Module system","A design pattern"]','Objects inheriting directly from other objects via the prototype chain','mcq'),
('javascript','medium','What is the difference between null and undefined?','["Same thing","null is an intentional absence of value; undefined means a variable has been declared but not assigned","null is an error","undefined is a type error"]','null is an intentional absence of value; undefined means declared but not assigned','mcq'),
('javascript','medium','What is hoisting?','["CSS positioning","Variable and function declarations moved to the top of their scope during compilation","A sorting algorithm","A DOM method"]','Variable and function declarations moved to the top of their scope during compilation','mcq'),
('javascript','medium','What does Array.prototype.reduce do?','["Creates a new array","Executes a reducer function on each element and returns a single accumulated value","Filters elements","Maps elements"]','Executes a reducer function on each element and returns a single accumulated value','mcq'),
('javascript','medium','What is destructuring?','["Deleting object properties","Extracting values from arrays or objects into distinct variables","A loop pattern","String splitting"]','Extracting values from arrays or objects into distinct variables','mcq'),
('javascript','medium','What is the difference between == and ===?','["No difference","== coerces types before comparison; === checks value and type without coercion","=== is slower","== is deprecated"]','== coerces types before comparison; === checks value and type without coercion','mcq'),
('javascript','medium','What are arrow functions?','["Regular functions","Compact function expressions that lexically bind this","Class methods only","Async functions"]','Compact function expressions that lexically bind this','mcq');

-- ── JAVASCRIPT – HARD ─────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('javascript','hard','What is the difference between call, apply, and bind?','["All the same","call invokes with individual args; apply invokes with array args; bind returns a new function with bound this","bind invokes immediately","apply is deprecated"]','call invokes with individual args; apply invokes with array args; bind returns a new function with bound this','mcq'),
('javascript','hard','What is a WeakMap?','["A regular Map","A Map where keys are weakly referenced objects, allowing garbage collection","A Map without iteration","An immutable Map"]','A Map where keys are weakly referenced objects, allowing garbage collection','mcq'),
('javascript','hard','What is memoization?','["Removing duplicates","Caching the result of expensive function calls based on inputs","Lazy evaluation","Currying"]','Caching the result of expensive function calls based on inputs','mcq'),
('javascript','hard','What is currying?','["A cooking function","Transforming a function with multiple arguments into a sequence of functions each taking one argument","A promise chain","A module pattern"]','Transforming a function with multiple arguments into a sequence of functions each taking one argument','mcq'),
('javascript','hard','What is a generator function?','["An async function","A function that can be paused and resumed using yield, returning an iterator","A constructor function","A factory function"]','A function that can be paused and resumed using yield, returning an iterator','mcq'),
('javascript','hard','What is a Proxy object?','["A server proxy","An object that wraps another and intercepts fundamental operations like get/set","A promise wrapper","An event emitter"]','An object that wraps another and intercepts fundamental operations like get/set','mcq'),
('javascript','hard','What is the temporal dead zone?','["A time-out error","The period between entering a block scope and the let/const declaration being evaluated","A garbage collection phase","An async delay"]','The period between entering a block scope and the let/const declaration being evaluated','mcq'),
('javascript','hard','How does the garbage collector work in JavaScript?','["Manual memory management","Automatically frees memory by detecting unreachable objects using mark-and-sweep","Reference counting only","Periodic full pauses"]','Automatically frees memory by detecting unreachable objects using mark-and-sweep','mcq'),
('javascript','hard','What is tail call optimization?','["A code style","An optimization where the last function call in a function is replaced by a jump, saving stack frames","A recursion pattern","An ES5 feature"]','An optimization where the last function call is replaced by a jump, saving stack frames','mcq'),
('javascript','hard','What is the module pattern?','["A CSS pattern","Using closures to create private/public members encapsulated in an IIFE or ES module","A class hierarchy","A routing pattern"]','Using closures to create private/public members encapsulated in an IIFE or ES module','mcq');

-- ── SQL – EASY ────────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('sql','easy','What does SELECT do?','["Inserts data","Retrieves data from a table","Deletes data","Updates data"]','Retrieves data from a table','mcq'),
('sql','easy','Which clause filters rows?','["ORDER BY","GROUP BY","WHERE","HAVING"]','WHERE','mcq'),
('sql','easy','What is a PRIMARY KEY?','["A foreign key","A unique identifier for a row","An index","A constraint name"]','A unique identifier for a row','mcq'),
('sql','easy','What does COUNT(*) return?','["Sum of values","Number of rows","Average","NULL count"]','Number of rows','mcq'),
('sql','easy','Which SQL statement adds new rows?','["UPDATE","SELECT","INSERT INTO","ALTER"]','INSERT INTO','mcq'),
('sql','easy','What does ORDER BY do?','["Groups rows","Filters rows","Sorts the result set","Joins tables"]','Sorts the result set','mcq'),
('sql','easy','What is a FOREIGN KEY?','["A duplicate key","A key referencing a primary key in another table","An index","A stored procedure"]','A key referencing a primary key in another table','mcq'),
('sql','easy','What does DISTINCT do?','["Selects all rows","Returns only unique values","Counts rows","Orders results"]','Returns only unique values','mcq'),
('sql','easy','Which clause is used with aggregate functions to filter groups?','["WHERE","ORDER BY","HAVING","GROUP BY"]','HAVING','mcq'),
('sql','easy','What does NULL mean in SQL?','["Zero","Empty string","Absence of a value","False"]','Absence of a value','mcq');

-- ── SQL – MEDIUM ──────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('sql','medium','What is the difference between INNER JOIN and LEFT JOIN?','["No difference","INNER returns only matching rows; LEFT returns all left rows and matched right rows","LEFT is faster","INNER includes NULLs"]','INNER returns only matching rows; LEFT returns all left rows and matched right rows','mcq'),
('sql','medium','What is a subquery?','["A stored procedure","A query nested inside another query","A view","An index"]','A query nested inside another query','mcq'),
('sql','medium','What does GROUP BY do?','["Sorts results","Aggregates rows with the same value in specified columns","Filters rows","Joins tables"]','Aggregates rows with the same value in specified columns','mcq'),
('sql','medium','What is an INDEX used for?','["Storing data","Speeding up data retrieval","Enforcing uniqueness only","Formatting output"]','Speeding up data retrieval','mcq'),
('sql','medium','What is a VIEW?','["A physical table","A virtual table defined by a SELECT query","A stored procedure","A trigger"]','A virtual table defined by a SELECT query','mcq'),
('sql','medium','What does COALESCE do?','["Counts nulls","Returns the first non-NULL value in a list","Combines strings","Converts types"]','Returns the first non-NULL value in a list','mcq'),
('sql','medium','What is a stored procedure?','["A SELECT query","A named, precompiled set of SQL statements stored on the server","A table constraint","An index type"]','A named, precompiled set of SQL statements stored on the server','mcq'),
('sql','medium','What is normalization?','["Encrypting data","Organizing data to reduce redundancy and improve integrity","Indexing tables","Partitioning"]','Organizing data to reduce redundancy and improve integrity','mcq'),
('sql','medium','What is the difference between DELETE and TRUNCATE?','["No difference","DELETE removes rows with a WHERE clause and is logged; TRUNCATE removes all rows quickly and cannot be rolled back in most DBs","TRUNCATE supports WHERE","DELETE is DDL"]','DELETE removes rows with WHERE and is logged; TRUNCATE removes all rows quickly','mcq'),
('sql','medium','What is a transaction?','["A single query","A unit of work that is atomic, consistent, isolated, and durable (ACID)","A stored procedure","A trigger"]','A unit of work that is atomic, consistent, isolated, and durable (ACID)','mcq');

-- ── SQL – HARD ────────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('sql','hard','What is a window function?','["A function for popups","A function that performs calculations across a set of rows related to the current row without collapsing them","An aggregate function","A string function"]','A function that performs calculations across a set of rows related to the current row without collapsing them','mcq'),
('sql','hard','What is a CTE (Common Table Expression)?','["A physical table","A temporary named result set defined with WITH for use within a single query","A view","An index"]','A temporary named result set defined with WITH for use within a single query','mcq'),
('sql','hard','What is query optimization?','["Writing shorter queries","The process by which the query planner chooses the most efficient execution plan","Caching results","Indexing all columns"]','The process by which the query planner chooses the most efficient execution plan','mcq'),
('sql','hard','What is a deadlock?','["A slow query","A situation where two transactions wait on each other indefinitely, each holding a lock the other needs","A missing index","A NULL error"]','Two transactions waiting on each other indefinitely holding needed locks','mcq'),
('sql','hard','What is EXPLAIN used for?','["Running a query","Displaying the query execution plan chosen by the optimizer","Granting permissions","Describing a table"]','Displaying the query execution plan chosen by the optimizer','mcq'),
('sql','hard','What is sharding?','["Encryption","Horizontally partitioning data across multiple database instances","Vertical scaling","Indexing strategy"]','Horizontally partitioning data across multiple database instances','mcq'),
('sql','hard','What is eventual consistency?','["Strong consistency","A consistency model where replicas converge to the same value over time","Immediate consistency","A transaction isolation level"]','A consistency model where replicas converge to the same value over time','mcq'),
('sql','hard','What is the difference between OLTP and OLAP?','["No difference","OLTP handles many short transactional writes; OLAP handles complex analytical queries over large datasets","OLAP uses NoSQL","OLTP is read-only"]','OLTP handles many short transactional writes; OLAP handles complex analytical queries','mcq'),
('sql','hard','What is an execution plan?','["A schema diagram","A description of the steps taken by the database engine to execute a query","A backup plan","A migration script"]','A description of the steps taken by the database engine to execute a query','mcq'),
('sql','hard','What is MVCC (Multi-Version Concurrency Control)?','["A version control system","A technique where each transaction sees a snapshot of the database, reducing lock contention","A backup technique","A replication method"]','A technique where each transaction sees a snapshot of the database, reducing lock contention','mcq');

-- ── DSA – EASY ────────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('dsa','easy','What is the time complexity of binary search?','["O(n)","O(n log n)","O(log n)","O(1)"]','O(log n)','mcq'),
('dsa','easy','Which data structure uses LIFO order?','["Queue","Stack","Linked List","Tree"]','Stack','mcq'),
('dsa','easy','What is the time complexity of accessing an element in an array?','["O(n)","O(log n)","O(1)","O(n²)"]','O(1)','mcq'),
('dsa','easy','Which sorting algorithm has O(n²) average complexity?','["Merge Sort","Quick Sort","Bubble Sort","Heap Sort"]','Bubble Sort','mcq'),
('dsa','easy','What is a linked list?','["An array with pointers","A sequence of nodes where each node contains data and a pointer to the next node","A hash table","A tree structure"]','A sequence of nodes where each node contains data and a pointer to the next node','mcq'),
('dsa','easy','What does a queue follow?','["LIFO","LILO","FIFO","FILO"]','FIFO','mcq'),
('dsa','easy','What is a hash table?','["A sorted array","A data structure that maps keys to values using a hash function","A tree","A stack"]','A data structure that maps keys to values using a hash function','mcq'),
('dsa','easy','What is recursion?','["A loop","A function that calls itself with a smaller problem until a base case is reached","A sort algorithm","A graph traversal"]','A function that calls itself with a smaller problem until a base case is reached','mcq'),
('dsa','easy','What is Big O notation?','["A math symbol","A way to describe algorithm complexity in terms of input size","A sorting algorithm","A data structure"]','A way to describe algorithm complexity in terms of input size','mcq'),
('dsa','easy','Which traversal visits root → left → right?','["In-order","Post-order","Pre-order","Level-order"]','Pre-order','mcq');

-- ── DSA – MEDIUM ──────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('dsa','medium','What is the time complexity of merge sort?','["O(n)","O(n²)","O(n log n)","O(log n)"]','O(n log n)','mcq'),
('dsa','medium','What is a balanced binary search tree?','["Any BST","A BST where the height difference between left and right subtrees is at most 1","A complete binary tree","A BST with no duplicates"]','A BST where height difference between subtrees is at most 1','mcq'),
('dsa','medium','What is dynamic programming?','["Random algorithms","An optimization technique breaking problems into overlapping subproblems and caching results","A sorting technique","Graph theory"]','An optimization technique breaking problems into overlapping subproblems and caching results','mcq'),
('dsa','medium','What is the difference between BFS and DFS?','["Same algorithm","BFS explores level by level using a queue; DFS explores deeply using a stack or recursion","DFS uses a queue","BFS uses recursion"]','BFS explores level by level using a queue; DFS explores deeply using a stack or recursion','mcq'),
('dsa','medium','What is a heap data structure?','["A linked list","A complete binary tree satisfying the heap property (min or max at root)","A hash table","A graph"]','A complete binary tree satisfying the heap property (min or max at root)','mcq'),
('dsa','medium','What is the time complexity of quicksort in the worst case?','["O(n log n)","O(n)","O(n²)","O(log n)"]','O(n²)','mcq'),
('dsa','medium','What is a graph?','["A chart","A data structure of vertices connected by edges","A sorted list","A tree with cycles"]','A data structure of vertices connected by edges','mcq'),
('dsa','medium','What is memoization in DSA context?','["Sorting","Storing results of expensive function calls to avoid recomputation","Traversal","Hashing"]','Storing results of expensive function calls to avoid recomputation','mcq'),
('dsa','medium','What is a trie?','["A tree for numbers","A prefix tree used for efficient string storage and retrieval","A balanced BST","A hash map"]','A prefix tree used for efficient string storage and retrieval','mcq'),
('dsa','medium','What is amortized analysis?','["Worst-case analysis","Average cost per operation over a sequence of operations","Best-case analysis","Space complexity analysis"]','Average cost per operation over a sequence of operations','mcq');

-- ── DSA – HARD ────────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('dsa','hard','What is Dijkstra''s algorithm used for?','["Sorting","Finding shortest paths in a weighted graph with non-negative edges","BFS traversal","Detecting cycles"]','Finding shortest paths in a weighted graph with non-negative edges','mcq'),
('dsa','hard','What is the difference between NP and NP-complete?','["Same class","NP is the set of problems verifiable in polynomial time; NP-complete are the hardest problems in NP","NP is unsolvable","NP-complete problems have polynomial solutions"]','NP is verifiable in polynomial time; NP-complete are the hardest problems in NP','mcq'),
('dsa','hard','What is a segment tree?','["A memory structure","A tree used for efficient range queries and point updates on arrays","A BST variant","A graph"]','A tree used for efficient range queries and point updates on arrays','mcq'),
('dsa','hard','What is the time complexity of Floyd-Warshall?','["O(V+E)","O(V²)","O(V³)","O(E log V)"]','O(V³)','mcq'),
('dsa','hard','What is a topological sort?','["A sorting algorithm for numbers","A linear ordering of vertices in a DAG where each vertex comes before vertices it has edges to","BFS on a tree","Heap sort variant"]','A linear ordering of DAG vertices where each comes before vertices it points to','mcq'),
('dsa','hard','What is the Union-Find (Disjoint Set) data structure used for?','["Sorting","Efficiently tracking connected components and union operations","Graph traversal","Dynamic programming"]','Efficiently tracking connected components and union operations','mcq'),
('dsa','hard','What is a Red-Black tree?','["A colored BST","A self-balancing BST with color properties ensuring O(log n) operations","A heap variant","A trie"]','A self-balancing BST with color properties ensuring O(log n) operations','mcq'),
('dsa','hard','What is the Knapsack problem?','["A string problem","An optimization problem choosing items with weights and values to maximize value within a capacity","A graph problem","A sorting problem"]','An optimization problem to maximize value within weight capacity','mcq'),
('dsa','hard','What is amortized O(1) in hash tables?','["Always O(1)","Average O(1) per operation over many operations despite occasional O(n) rehashing","Worst-case O(1)","Best-case only"]','Average O(1) per operation over many operations despite occasional O(n) rehashing','mcq'),
('dsa','hard','What is the Master Theorem used for?','["Graph algorithms","Solving recurrences of the form T(n)=aT(n/b)+f(n) to determine algorithm complexity","Sorting","Memory analysis"]','Solving recurrences T(n)=aT(n/b)+f(n) to determine complexity','mcq');

-- ── APTITUDE – EASY ───────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('aptitude','easy','What is 15% of 200?','["25","30","35","40"]','30','mcq'),
('aptitude','easy','If a train travels 60 km in 1.5 hours, what is its speed?','["30 km/h","40 km/h","45 km/h","50 km/h"]','40 km/h','mcq'),
('aptitude','easy','What comes next: 2, 4, 8, 16, __?','["24","28","32","36"]','32','mcq'),
('aptitude','easy','A shirt costs $40 after a 20% discount. What was the original price?','["$48","$50","$52","$55"]','$50','mcq'),
('aptitude','easy','If 6 workers complete a job in 10 days, how many days will 3 workers take?','["15","20","25","30"]','20','mcq'),
('aptitude','easy','What is the HCF of 12 and 18?','["3","6","9","12"]','6','mcq'),
('aptitude','easy','A car covers 150 km in 3 hours. What is the average speed?','["40 km/h","50 km/h","55 km/h","60 km/h"]','50 km/h','mcq'),
('aptitude','easy','What is 3/4 as a percentage?','["70%","72%","75%","80%"]','75%','mcq'),
('aptitude','easy','Find the odd one out: 2, 3, 5, 7, 9, 11','["3","5","9","11"]','9','mcq'),
('aptitude','easy','What is the area of a rectangle with length 8 cm and width 5 cm?','["30 cm²","35 cm²","40 cm²","45 cm²"]','40 cm²','mcq');

-- ── APTITUDE – MEDIUM ─────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('aptitude','medium','A pipe fills a tank in 4 hours and another empties it in 6 hours. How long to fill the empty tank with both open?','["10 hrs","12 hrs","14 hrs","16 hrs"]','12 hrs','mcq'),
('aptitude','medium','The average of 5 numbers is 40. If one number is excluded the average becomes 38. What is the excluded number?','["46","48","50","52"]','48','mcq'),
('aptitude','medium','A man walks 5 km north, then 12 km east. How far is he from the start?','["13 km","14 km","15 km","17 km"]','13 km','mcq'),
('aptitude','medium','If the ratio of boys to girls is 3:5 and there are 120 girls, how many boys are there?','["60","72","80","90"]','72','mcq'),
('aptitude','medium','Simple interest on Rs 2000 at 10% per year for 2 years is:','["Rs 300","Rs 350","Rs 400","Rs 450"]','Rs 400','mcq'),
('aptitude','medium','In how many ways can 4 people be arranged in a row?','["12","18","24","36"]','24','mcq'),
('aptitude','medium','A train 200 m long passes a pole in 10 seconds. What is the speed?','["15 m/s","18 m/s","20 m/s","25 m/s"]','20 m/s','mcq'),
('aptitude','medium','What is the probability of getting a head when a fair coin is tossed?','["1/4","1/3","1/2","2/3"]','1/2','mcq'),
('aptitude','medium','Find the missing number: 3, 6, 11, 18, 27, __','["36","38","39","40"]','38','mcq'),
('aptitude','medium','If BOOK is coded as 2-15-15-11, what is CODE?','["3-15-4-5","3-14-4-5","2-15-4-5","3-15-5-4"]','3-15-4-5','mcq');

-- ── APTITUDE – HARD ───────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('aptitude','hard','Two trains 150 m and 200 m long run at 60 km/h and 40 km/h toward each other. Time to cross?','["10 s","12 s","14 s","15 s"]','12 s','mcq'),
('aptitude','hard','Compound interest on Rs 5000 at 10% per annum for 2 years compounded annually is:','["Rs 1000","Rs 1025","Rs 1050","Rs 1075"]','Rs 1050','mcq'),
('aptitude','hard','A bag has 5 red, 4 blue, 3 green balls. Probability of picking 2 red balls:','["1/11","2/11","5/22","10/66"]','10/66','mcq'),
('aptitude','hard','A mixture of 40 L has milk:water = 3:1. How much water to add for 2:1 milk:water ratio?','["5 L","8 L","10 L","12 L"]','10 L','mcq'),
('aptitude','hard','A works twice as fast as B. Together they finish in 18 days. How long does A alone take?','["24 days","27 days","30 days","36 days"]','27 days','mcq'),
('aptitude','hard','The digits of a two-digit number sum to 9 and the number is 27 more than its reverse. The number is:','["36","54","63","72"]','63','mcq'),
('aptitude','hard','Speed of a boat in still water is 15 km/h; current is 5 km/h. Ratio of downstream to upstream time for equal distance?','["1:2","2:1","3:2","1:3"]','2:1','mcq'),
('aptitude','hard','How many 4-digit numbers are divisible by both 3 and 5?','["600","601","599","598"]','600','mcq'),
('aptitude','hard','If log₂8 = x, what is x?','["2","3","4","8"]','3','mcq'),
('aptitude','hard','A clock shows 3:15. What is the angle between the hands?','["7.5°","0°","15°","22.5°"]','7.5°','mcq');

-- ── HR – EASY ─────────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('hr','easy','How do you handle conflicts with a coworker?','["Ignore the issue","Address it calmly and privately, seeking mutual understanding","Complain to HR immediately","Involve the whole team"]','Address it calmly and privately, seeking mutual understanding','mcq'),
('hr','easy','What is your greatest strength?','["I have no weaknesses","I am a quick learner who adapts and improves continuously","I always work alone","I never make mistakes"]','I am a quick learner who adapts and improves continuously','mcq'),
('hr','easy','Why do you want to work here?','["Just for the money","Your company''s mission aligns with my career goals and values","I couldn''t find anywhere else","My friend works here"]','Your company''s mission aligns with my career goals and values','mcq'),
('hr','easy','Describe your work style.','["I work randomly","I am organized, proactive and deliver quality work on deadlines","I wait for instructions","I prefer to avoid teamwork"]','I am organized, proactive and deliver quality work on deadlines','mcq'),
('hr','easy','How do you prioritize tasks?','["Pick whichever","Use a framework like Eisenhower matrix and communicate with stakeholders","Do easiest first","Ignore low-priority items"]','Use a framework like Eisenhower matrix and communicate with stakeholders','mcq');

-- ── HR – MEDIUM ───────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('hr','medium','Describe a time you failed and what you learned.','["I never fail","I missed a deadline due to poor planning; I learned to break tasks into milestones","I prefer not to share","Failure doesn''t teach anything"]','I missed a deadline due to poor planning; I learned to break tasks into milestones','mcq'),
('hr','medium','How do you handle pressure and tight deadlines?','["I panic","I prioritize, break work into chunks, communicate risks early and stay focused","I ask for extensions always","I let quality drop"]','I prioritize, break into chunks, communicate risks early and stay focused','mcq'),
('hr','medium','Tell me about a time you showed leadership.','["I never led","I led a cross-functional project, aligned stakeholders and delivered on time","I avoided leadership","I delegated everything"]','I led a cross-functional project, aligned stakeholders and delivered on time','mcq'),
('hr','medium','Where do you see yourself in 5 years?','["I have no plans","I aim to deepen my expertise, take on leadership and contribute to impactful products","I want your job","I want to leave the industry"]','I aim to deepen expertise, take on leadership and contribute to impactful products','mcq'),
('hr','medium','How do you give constructive feedback?','["I avoid it","I use specific examples, focus on behavior not person, and suggest improvements respectfully","I am blunt without care","I only praise"]','Specific examples, focus on behavior, suggest improvements respectfully','mcq');

-- ── HR – HARD ─────────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('hr','hard','How do you manage ambiguity on projects?','["I refuse ambiguous tasks","I clarify scope, identify risks, make informed decisions and iterate","I escalate immediately","I wait for perfect information"]','I clarify scope, identify risks, make informed decisions and iterate','mcq'),
('hr','hard','Describe a situation where you had to influence without authority.','["Not possible","I built trust, aligned on shared goals and used data to persuade stakeholders","I gave up","I used authority anyway"]','I built trust, aligned on shared goals and used data to persuade stakeholders','mcq'),
('hr','hard','How do you deal with underperforming team members?','["Fire them","Have a private conversation, understand root causes, set clear expectations and offer support","Ignore the issue","Blame them publicly"]','Private conversation, understand root causes, set clear expectations, offer support','mcq'),
('hr','hard','Tell me about a time you managed competing priorities.','["I can''t multitask","I mapped priorities against business impact, negotiated timelines and delivered critical items first","I did everything at once","I ignored some tasks"]','I mapped priorities by business impact, negotiated timelines and delivered critical items first','mcq'),
('hr','hard','How do you stay updated with industry trends?','["I don''t","I follow industry blogs, attend conferences, take courses and experiment with new tools","I rely on colleagues only","I read textbooks only"]','Follow blogs, attend conferences, take courses and experiment with new tools','mcq');

-- ── COMMUNICATION – EASY ──────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('communication','easy','What is active listening?','["Waiting for your turn to speak","Fully concentrating, understanding and responding thoughtfully to a speaker","Nodding without understanding","Taking notes mechanically"]','Fully concentrating, understanding and responding thoughtfully to a speaker','mcq'),
('communication','easy','How do you ensure your message is understood?','["Speak loudly","Use clear language, check for understanding and invite questions","Use jargon","Send an email only"]','Use clear language, check for understanding and invite questions','mcq'),
('communication','easy','What is non-verbal communication?','["Sign language only","Body language, facial expressions, gestures and tone that convey messages","Written communication","Email etiquette"]','Body language, facial expressions, gestures and tone that convey messages','mcq'),
('communication','easy','How do you handle a miscommunication?','["Ignore it","Clarify misunderstanding calmly, restate the message clearly and confirm alignment","Blame the other party","Send a long email"]','Clarify calmly, restate clearly and confirm alignment','mcq'),
('communication','easy','What makes a good presentation?','["Reading from slides","Clear structure, engaging delivery, relevant content and audience interaction","Lots of text on slides","Avoiding eye contact"]','Clear structure, engaging delivery, relevant content and audience interaction','mcq');

-- ── COMMUNICATION – MEDIUM ────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('communication','medium','How do you adapt communication for a technical vs non-technical audience?','["Use the same language","Use technical depth with engineers; focus on business impact and analogies with non-technical audiences","Always simplify","Always use jargon"]','Technical depth with engineers; business impact and analogies with non-technical audiences','mcq'),
('communication','medium','Describe a situation where written communication was critical.','["Written comms don''t matter","Documenting a complex process clearly reduced team errors and onboarding time significantly","Verbal is always better","I avoid writing"]','Documenting a complex process clearly reduced errors and onboarding time','mcq'),
('communication','medium','How do you manage communication in a remote team?','["Leave it to chance","Use async-first tools, regular standups, clear documentation and explicit status updates","Meet daily in person","Only use email"]','Async-first tools, regular standups, clear documentation and explicit status updates','mcq'),
('communication','medium','What is the difference between assertive and aggressive communication?','["Same thing","Assertive expresses needs clearly while respecting others; aggressive disregards others","Assertive is passive","Aggressive is effective"]','Assertive expresses needs clearly while respecting others; aggressive disregards others','mcq'),
('communication','medium','How do you structure a difficult conversation?','["Avoid it","Prepare your points, choose a private setting, listen actively, focus on issues not person","Be confrontational","Email only"]','Prepare, private setting, listen actively, focus on issues not person','mcq');

-- ── COMMUNICATION – HARD ──────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('communication','hard','How do you communicate bad news to stakeholders?','["Hide it","Deliver it promptly with context, impact analysis and a mitigation plan","Blame others","Delay as long as possible"]','Promptly with context, impact analysis and a mitigation plan','mcq'),
('communication','hard','Describe how you handle communication breakdown in a cross-cultural team.','["Ignore differences","Acknowledge cultural norms, create shared communication norms and use inclusive language","Force one style","Avoid diverse teams"]','Acknowledge cultural norms, create shared norms and use inclusive language','mcq'),
('communication','hard','How do you build trust through communication?','["Make promises","Be consistent, transparent, follow through on commitments and listen empathetically","Use formal language only","Avoid sharing information"]','Be consistent, transparent, follow through and listen empathetically','mcq'),
('communication','hard','What techniques do you use for high-stakes presentations?','["Improvise","Thorough preparation, audience analysis, storytelling, rehearsal and handling objections confidently","Read from notes","Keep it very short"]','Thorough preparation, audience analysis, storytelling, rehearsal and handling objections confidently','mcq'),
('communication','hard','How do you ensure effective communication in a matrix organization?','["Ignore matrix complexity","Clarify roles/accountabilities, build cross-functional relationships and over-communicate priorities","Work in silos","Escalate everything"]','Clarify roles, build cross-functional relationships and over-communicate priorities','mcq');

-- ── NODE.JS – EASY ────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('node','easy','What is Node.js?','["A browser","A JavaScript runtime built on Chrome''s V8 engine for server-side code","A database","A CSS framework"]','A JavaScript runtime built on Chrome''s V8 engine for server-side code','mcq'),
('node','easy','What does npm stand for?','["Node Package Module","Node Project Manager","Node Package Manager","Network Package Manager"]','Node Package Manager','mcq'),
('node','easy','What is the event-driven model in Node.js?','["Synchronous processing","Using events and callbacks to handle I/O without blocking","Multi-threading","A design pattern"]','Using events and callbacks to handle I/O without blocking','mcq'),
('node','easy','What is Express.js?','["A database ORM","A minimal web framework for Node.js","A testing library","A bundler"]','A minimal web framework for Node.js','mcq'),
('node','easy','What does require() do in Node.js?','["Runs a file","Imports a module","Declares a variable","Creates a server"]','Imports a module','mcq');

-- ── NODE.JS – MEDIUM ──────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('node','medium','What is middleware in Express?','["A database","Functions with access to req, res and next that can modify request/response or end the cycle","A routing method","An error handler only"]','Functions with access to req, res and next that can modify request/response or end the cycle','mcq'),
('node','medium','What is the difference between process.nextTick and setImmediate?','["Same thing","nextTick fires before I/O callbacks; setImmediate fires in the check phase after I/O callbacks","nextTick is async","setImmediate is synchronous"]','nextTick fires before I/O callbacks; setImmediate fires in the check phase after I/O callbacks','mcq'),
('node','medium','What is streams in Node.js?','["File storage","Objects for reading/writing data in chunks, enabling efficient I/O","Database connections","HTTP clients"]','Objects for reading/writing data in chunks, enabling efficient I/O','mcq'),
('node','medium','How does clustering work in Node.js?','["One process only","Using the cluster module to spawn multiple worker processes sharing the same port","Thread pools","Load balancers only"]','Using the cluster module to spawn multiple worker processes sharing the same port','mcq'),
('node','medium','What is the purpose of package.json?','["Store code","Define project metadata, scripts, and dependencies","Configure the OS","Manage databases"]','Define project metadata, scripts, and dependencies','mcq');

-- ── NODE.JS – HARD ────────────────────────────────────────────
INSERT IGNORE INTO questions (category, difficulty, question_text, options, answer, type) VALUES
('node','hard','Explain the Node.js event loop phases.','["Single phase","timers → pending callbacks → idle/prepare → poll → check → close callbacks","poll → timers → check","timers → check → poll"]','timers → pending callbacks → idle/prepare → poll → check → close callbacks','mcq'),
('node','hard','What is memory leak prevention in Node.js?','["Not possible","Using WeakMaps, clearing timers/listeners, avoiding global state and profiling with heap snapshots","Only garbage collection","Restart the server"]','Using WeakMaps, clearing timers/listeners, avoiding global state and profiling with heap snapshots','mcq'),
('node','hard','How do you implement graceful shutdown in Node.js?','["Kill the process","Listen for SIGTERM, stop accepting new requests, finish in-flight requests, close DB connections","Use process.exit(0) immediately","Ignore shutdown signals"]','Listen for SIGTERM, stop accepting new requests, finish in-flight requests, close DB connections','mcq'),
('node','hard','What are worker threads in Node.js?','["Cluster workers","True threads for CPU-intensive work that run JavaScript in parallel without blocking the event loop","Same as child processes","A deprecated feature"]','True threads for CPU-intensive work running JavaScript in parallel without blocking the event loop','mcq'),
('node','hard','What is backpressure in Node.js streams?','["A performance issue","The mechanism where a writable stream signals a readable stream to pause when the buffer is full","A memory error","A network timeout"]','The mechanism where a writable signals a readable to pause when the buffer is full','mcq');
