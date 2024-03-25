import React from 'react';
import './App.css';

function ConsentFormPopup({ isVisible, onConsent }) {
  if (!isVisible) return null;

  return (
    <div className="consent-popup">
      <div className="consent-content">
        <h2>Consent Form Required</h2>
        <p>Please read the <a href={`${process.env.PUBLIC_URL}${"/ParticipantInfo.pdf"}`} target="_blank">Participant Information Sheet</a> and sign the <a href={`${process.env.PUBLIC_URL}${"/ConsentForm.pdf"}`} target="_blank">Informed Consent Form</a> before proceeding.</p>
        <div>
          <input type="checkbox" id="consentCheckbox" />
          <label htmlFor="consentCheckbox">I have read the Participant Information Sheet and signed the Consent Form.</label>
        </div>
        <button onClick={onConsent}>Continue</button>
      </div>
    </div>
  );
}

export default ConsentFormPopup;
