import { RouteComponentProps } from "react-router-dom";

interface HomepageProps {
  handleInput: any;
  handleSubmit: any;
  searchResults: any;
  searchInput: any;
  getTrack: any;
}

const Homepage = (props: RouteComponentProps & HomepageProps) => {
  return (
    <div>
      <form onSubmit={props.handleSubmit}>
        <input
          type="text"
          onChange={props.handleInput}
          name="searchInput"
          value={props.searchInput}
        />
        <button type="submit">Search</button>
      </form>
      {props.searchResults.length > 0 && (
        <div className="container mt-5">
          <div className="row">
            {props.searchResults.map((album: any) => (
              <div
                className="col-3"
                key={album.id}
                onClick={() => props.getTrack(album.id)}
              >
                <div>
                  <img src={album.album.cover} alt="about albums" />
                </div>
                <p> {album.title} </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
