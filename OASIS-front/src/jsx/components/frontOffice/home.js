import React from "react";

const HomeFront = () => {
  return (
    <div className="mt-10">
      {/* create post card */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Create Post</h3>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-control" placeholder="Title" />
              <label className="form-label">Body</label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Body"
              ></textarea>
            </div>
            <div className="form-footer">
              <button type="submit" className="btn btn-primary btn-block">
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeFront;
