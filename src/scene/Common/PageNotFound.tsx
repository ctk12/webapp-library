
const containerStyle = {
  height: "100vh",
  widows: "100vw",
  background: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const PageNotFound = () => {
    return (
      <div style={containerStyle}>
        <h3>Uh oh, we can’t seem to find the page you’re looking for. 
            Try going back to the previous page</h3>
      </div>
    );
}

export default PageNotFound;
