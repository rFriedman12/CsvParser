import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Pages/Layout';
import Generate from './Pages/Generate';
import Upload from './Pages/Upload';
import Home from './Pages/Home';

function App() {
    return <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/upload' component={Upload} />
        <Route exact path='/generate' component={Generate} />        
    </Layout>
}

export default App;