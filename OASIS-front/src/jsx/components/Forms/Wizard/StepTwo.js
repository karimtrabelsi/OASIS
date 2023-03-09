import React from "react";

const StepTwo = () => {
  return (
    <section>
      <div className="row">
        <div className="col-lg-12 mb-2">
          <div className="form-group">
            <label className="text-label">Choose your Club*</label>
            <select
              className="form-control form-control-lg"
              id="inlineFormCustomSelect"
            >
              <option selected>Choose...</option>
              <option value="Rotaract Tunis Golfe">Rotaract Tunis Golfe</option>
              <option value="Lions Club Tunis Esprit">
                Lions Club Tunis Esprit
              </option>
              <option value="Lions Club Yasmine Soukra">
                Lions Club Yasmine Soukra
              </option>
            </select>
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <div className="form-group">
            <label className="text-label">Are you a ?*</label>
            <div className="form-group ">
              <label className="radio-inline mr-3">
                <input type="radio" name="optradio" /> Member
              </label>
              <label className="radio-inline mr-3">
                <input type="radio" name="optradio" /> President
              </label>
              <label className="radio-inline mr-3">
                <input type="radio" name="optradio" /> Secretary
              </label>
            </div>
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <div className="form-group">
            <label className="text-label">Company Phone Number*</label>
            <input
              type="text"
              name="phoneNumber"
              className="form-control"
              placeholder="(+1)408-657-9007"
              required
            />
          </div>
        </div>
        <div className="col-lg-12 mb-2">
          <div className="form-group">
            <div className="custom-file">
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="photo"
                //  onChange={handlePhoto}
                className="custom-file-input"
                //test
              />
              <label className="custom-file-label">Choose file</label>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepTwo;
