import React from 'react';
import SimpleForm from './src/component/SimpleForm';
import Style from './public/css/style.css';

class App extends React.Component {
   render() {
      return (
         <div className='sm'>
           <SimpleForm/> 
         </div>
      );
   }
}
export default App;