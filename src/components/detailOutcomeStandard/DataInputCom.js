import React from "react";

export default class DataInputCom extends React.Component {
  constructor(props) {
    super(props);
  }
  ImportFile = e => {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  };
  render() {
    return (
      <form>
        <label
          style={{
            borderRadius: " 8px",
            border: "1px solid #17C671",
            margin: "0px 0px 0px 10px",
            display: "inline-block",
            color: "#17C671",
            padding: "6px",
            cursor: "pointer"
          }}
          for="file"
          class="custom-file-upload"
        >
          <i class="material-icons">cloud_upload</i> Tải file Excel
        </label>
        <input
          type="file"
          style={{ visibility: "hidden" }}
          className="form-control"
          id="file"
          onChange={this.ImportFile}
        />
      </form>
    );
  }
}
