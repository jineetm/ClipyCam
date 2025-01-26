// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import LoginView from './components/LoginView';
// import SignupView from './components/SignupView';

// function App() {
//   return (
//     <Router>
//       <div style={{ margin: '20px' }}>
//         <nav>
//           <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
//           <Link to="/signup">Signup</Link>
//         </nav>
//       </div>
//       <Routes>
//         <Route path="/" element={<LoginView />} />
//         <Route path="/signup" element={<SignupView />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import LoginView from './components/LoginView';
import SignupView from './components/SignupView';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        {/* Redirect any invalid route to Login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
