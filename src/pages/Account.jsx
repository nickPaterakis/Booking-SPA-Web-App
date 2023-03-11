import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useKeycloak } from '@react-keycloak/web';
import EdiText from 'react-editext';
import noImageProfile from '../assets/images/no-image-profile.png';
import { setFirstName, setLastName, setPhone } from '../store/actions/userActions';
import { imageUpload, updateUser } from '../api/UserService';
import { config } from '../constants/systemConstants';

function Account() {
  const dispatch = useDispatch();
  const { keycloak } = useKeycloak();
  const user = useSelector((state) => state.user);
  const [firstNameMode, setFirstNameMode] = useState('view-container');
  const [lastNameMode, setLastNameMode] = useState('view-container');
  const [phoneMode, setPhoneMode] = useState('view-container');
  const [selectedImage, setSelectedImage] = useState();
  const inputEl = useRef(null);
  const requestData = new FormData();

  const changeFirstNameFieldToEditMode = () => {
    setFirstNameMode('edit-container');
  };

  const changeFirstNameFieldToViewMode = () => {
    setFirstNameMode('view-container');
  };

  const changeLastNameFieldToEditMode = () => {
    setLastNameMode('edit-container');
  };

  const changeLastNameFieldToViewMode = () => {
    setLastNameMode('view-container');
  };

  const changePhoneFieldToEditMode = () => {
    setPhoneMode('edit-container');
  };

  const changePhoneFieldToViewMode = () => {
    setPhoneMode('view-container');
  };

  const handleFirstNameSave = async (firstName) => {
    changeFirstNameFieldToViewMode();
    requestData.append('user', JSON.stringify({ ...user, firstName }));
    await updateUser(keycloak.token, requestData);
    dispatch(setFirstName(firstName));
  };

  const handleLastNameSave = async (lastName) => {
    changeLastNameFieldToViewMode();
    requestData.append('user', JSON.stringify({ ...user, lastName }));
    await updateUser(keycloak.token, requestData);
    dispatch(setLastName(lastName));
  };

  const handlePhoneSave = async (phone) => {
    changePhoneFieldToViewMode();
    requestData.append('user', JSON.stringify({ ...user, phone }));
    await updateUser(keycloak.token, requestData);
    dispatch(setPhone(phone));
  };

  const imageSelectedHandler = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const imageUploadHandler = async () => {
    requestData.append('image', selectedImage);
    requestData.append('user', JSON.stringify(user));
    await updateUser(keycloak.token, requestData);
    window.location.reload();
  };

  console.log(user);
  let image;
  if (selectedImage) {
    image = URL.createObjectURL(selectedImage);
  } else if (user.image) {
    image = config.url.USER_IMAGES_URL + user.image;
  } else {
    image = noImageProfile;
  }
  console.log(image);

  // clearFormData();

  return (
    <main className="account">
      <div className="account__container">
        <div className="profile-title">
          Account
        </div>
        <div className="account__wrapper">
          <div className="account__left-column">
            <div className="account__profile-image">
              <img src={image} alt="profile" />
            </div>
            <div>
              <input 
                style={{ display: 'none' }}
                type="file" 
                name="file"
                onChange={imageSelectedHandler} 
                ref={inputEl}
              />
              {selectedImage
                ? <button className="btn btn--upload-image" type="button" onClick={imageUploadHandler}>Upload</button>
                : <button className="btn btn--change-image" type="button" onClick={() => inputEl.current.click()}>Change Image</button>}
            </div>
            <div className="account__welcome-message">
              Welcome back, 
              {' '}
              <br />
              {user.firstName}
            </div>
          </div>
          <div className="account__right-column">
            <div className="account__right-column__title">
              Preferences
            </div>
            <div className="edit-text">
              <div className="edit-text__title">
                First name
              </div>
              <EdiText 
                type="text" 
                value={user.firstName ? user.firstName : 'None'} 
                onSave={handleFirstNameSave}
                onCancel={changeFirstNameFieldToViewMode}
                onEditingStart={changeFirstNameFieldToEditMode}
                editButtonContent="edit"
                cancelButtonContent="Cancel"
                saveButtonContent="Save"
                editButtonClassName="edit-button"
                cancelButtonClassName="cancel-button"
                saveButtonClassName="save-button"
                viewContainerClassName={firstNameMode} 
                editOnViewClick={true}
              />
            </div>
            <div className="edit-text">
              <div className="edit-text__title">
                Last name
              </div>
              <EdiText 
                type="text" 
                value={user.lastName ? user.lastName : 'None'} 
                onSave={handleLastNameSave}
                onCancel={changeLastNameFieldToViewMode}
                onEditingStart={changeLastNameFieldToEditMode}
                editButtonContent="edit"
                cancelButtonContent="Cancel"
                saveButtonContent="Save"
                editButtonClassName="edit-button"
                cancelButtonClassName="cancel-button"
                saveButtonClassName="save-button"
                viewContainerClassName={lastNameMode}  
                editOnViewClick={true}
              />
            </div>
            <div className="edit-text">  
              <div className="edit-text__title">
                Email
              </div>
              <div className="edit-text__value">
                {user.email ? user.email : 'None'} 
              </div>
            </div>
            <div className="edit-text">
              <div className="edit-text__title">
                Phone
              </div>
              <EdiText 
                type="text" 
                value={user.phone ? user.phone : 'None'} 
                onSave={handlePhoneSave}
                onCancel={changePhoneFieldToViewMode}
                onEditingStart={changePhoneFieldToEditMode}
                editButtonContent="edit"
                cancelButtonContent="Cancel"
                saveButtonContent="Save"
                editButtonClassName="edit-button"
                cancelButtonClassName="cancel-button"
                saveButtonClassName="save-button"
                viewContainerClassName={phoneMode}
                editOnViewClick={true}
              />
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}

export default Account;
