import React, { useState, useEffect } from 'react';
import { Auth } from '@aws-amplify/auth';
import AWS from 'aws-sdk';

const INSTANCE_ID = process.env.REACT_APP_INSTANCE_ID;
const CONTACT_FLOW_ID = process.env.REACT_APP_CONTACT_FLOW_ID;
const SOURCE_PHONE_NUMBER = process.env.REACT_APP_SOURCE_PHONE_NUMBER;

export default function ContactForm() {
  const [credentials, setCredentials] = useState(null);
  const [name, setName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const [product, setProduct] = useState(null);

  const init = async() => {
    const crd = await Auth.currentCredentials();
    setCredentials(crd);
    console.log(credentials);
  };
  useEffect(() => {
    init();
  },[]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleProductChange = (event) => {
    setProduct(event.target.value);
  };

  const onCall = () => {
    console.log(name);
    console.log(phoneNumber);
    console.log(address);
    console.log(product);
    const connect = new AWS.Connect({
      credentials: credentials,
      apiVersion: '2017-08-08',
      region: 'ap-northeast-1'
    });

    const params = {
      InstanceId: INSTANCE_ID,
      ContactFlowId: CONTACT_FLOW_ID,
      DestinationPhoneNumber: phoneNumber,
      SourcePhoneNumber: SOURCE_PHONE_NUMBER,
      Attributes: {
        name: name,
        address: address,
        product: product
      }
    };
    connect.startOutboundVoiceContact(params,(err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  };

  const modalBody = (
    <div className="modal">
      <div className="modal-background"></div>
        <div className="modal-content">
          うんち！
        </div>
      <button className="modal-close is-large" aria-label="close"></button>
    </div>
  );

  return (
    <div className="column is-half">
      <div className="field ">
        <label className="label">お名前</label>
        <div className="control">
          <input className="input" type="text" placeholder="山田 太郎" onChange={handleNameChange} />
        </div>
      </div>

      <div className="field ">
        <label className="label">電話番号</label>
        <div className="control">
          <input className="input" type="text" placeholder="090-1111-2222" onChange={handlePhoneNumberChange} />
        </div>
      </div>

      <div className="field ">
        <label className="label">住所</label>
        <div className="control">
          <input className="input" type="text" placeholder="東京都台東区小島2-20-7 扶桑御徒町ビル2階" onChange={handleAddressChange} />
        </div>
      </div>

      <div className="field ">
        <label className="label">製品情報</label>
        <div className="control">
          <input className="input" type="text" placeholder="YouWire" onChange={handleProductChange} />
        </div>
      </div>

      <div className="field  ">
        <div className="control">
          <button className="button is-primary" onClick={() => onCall()}>
            発信
          </button>
        </div>
      </div>  
    </div>
  );
}