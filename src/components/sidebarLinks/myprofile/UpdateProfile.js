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
    console.log(userInfo);
    getUserInfo(id)
    showUpdate()
  }

  return props.showInfo ? (
    <div className="update-profile">
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name"
          name="name"
          value={name}
          onChange={onChange}
        />
        <input type="text" placeholder="Age"
          name="age"
          value={age}
          onChange={onChange}
        />
        <input type="text" placeholder="City"
          name="city"
          value={city}
          onChange={onChange} />
        <input type="text" placeholder="Job"
          name="job"
          value={job}
          onChange={onChange}
        />
        <input type="text" placeholder="Company"
          name="company"
          value={company}
          onChange={onChange}
        />
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
  ) : (<div>
    <h2>Name: {name}</h2>
    <h2>Age: {age}</h2>
    <h2>City: {city}</h2>
    <h2>Job: {job}</h2>
    <h2>Company: {company}</h2>
    <h2>Website: {website}</h2>

  </div>)
}

export default UpdateProfile;