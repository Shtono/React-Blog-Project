import React, { useState } from 'react';

const UpdateProfile = (props) => {
  const [userInfo, setuserInfo] = useState({
    name: props.name || '',
    age: props.age || '',
    city: props.city || '',
    job: props.job || '',
    company: props.company || '',
    website: props.website || ''
  })
  // Destructure props and state
  const { name, age, city, job, company, website } = userInfo;
  const { getUserInfo, id, showUpdate } = props;

  const onChange = (e) => {
    setuserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();
    props.updateUserInfo(userInfo);
    getUserInfo(id)
    showUpdate()
  }

  return props.showInfo ? (
    <div className="update-profile">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <label htmlFor="age">Age</label>
        <input type="text" placeholder="Age"
          name="age"
          value={age}
          onChange={onChange}
        />
        <label htmlFor="city">City</label>
        <input type="text" placeholder="City"
          name="city"
          value={city}
          onChange={onChange} />
        <label htmlFor="job">Job</label>
        <input type="text" placeholder="Job"
          name="job"
          value={job}
          onChange={onChange}
        />
        <label htmlFor="company">Company</label>
        <input type="text" placeholder="Company"
          name="company"
          value={company}
          onChange={onChange}
        />
        <label htmlFor="website">Website</label>
        <input type="text" placeholder="Website"
          name="website"
          value={website}
          onChange={onChange}
        />
        <div>
          <button type="button" onClick={props.showUpdate}>Cancel</button>
          <button className="btn-green" type="submit">Update</button>
        </div>
      </form>
    </div>
  ) : (<div className="update-profile">
    <h4>Personal Info</h4>
    <p>Name: {name}</p>
    <p>Age: {age}</p>
    <p>City: {city}</p>
    <p>Job: {job}</p>
    <p>Company: {company}</p>
    <p>Website: {website}</p>

  </div>)
}

export default UpdateProfile;