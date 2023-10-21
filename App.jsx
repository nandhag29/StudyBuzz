import React, { Component } from 'react';
import reactLogo from './assets/react.svg';
import axios from 'axios';
import './App.css';

// function Ap() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="App">
//       <div>
//         {/* <a href="https://vitejs.dev" target="_blank">
//           <img src="/vite.svg" className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://reactjs.org" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a> */}
//       </div>
//       <h1>StudyBuzz</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           File Upload
//         </button>
//         <p>
//           Upload File to Trascribe Video Into Notes
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </div>
//   )
// }

class App extends Component {
  state = {
 
    // Initially, no file is selected
    selectedFile: null
};

// On file select (from the pop up)
onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

};

// On file upload (click the upload button)
onFileUpload = () => {

    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
        "myFile",
        this.state.selectedFile,
        this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios.post("api/uploadfile", formData);
};

// File content to be displayed after
// file upload is complete
fileData = () => {

    if (this.state.selectedFile) {

        return (
            <div>
                <h2>File Details:</h2>
                <p>File Name: {this.state.selectedFile.name}</p>

                <p>File Type: {this.state.selectedFile.type}</p>

                <p>
                    Last Modified:{" "}
                    {this.state.selectedFile.lastModifiedDate.toDateString()}
                </p>

            </div>
        );
    } else {
        return (
            <div>
                <br />
                <h4>Upload a Video to turn it into Buzznotes!</h4>
            </div>
        );
    }
};

render() {

    return (
        <div>
            <h1>
                StudyBuzz
            </h1>
            <h3>
                File Upload
            </h3>
            <div className='card'>
                <input type="file" onChange={this.onFileChange} />
                <button onClick={this.onFileUpload}>
                    Upload!
                </button>
            </div>
            {this.fileData()}
        </div>
    );
}
}
export default App;