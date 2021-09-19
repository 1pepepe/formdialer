import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components';
import awsconfig from './aws-exports';

import 'bulma/css/bulma.css'

import ContactForm from './components/ContactForm';

Amplify.configure(awsconfig);


const App = () => {
  const [authState, setAuthState] = React.useState();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData)
    });
  }, []);

  const signOut = () => {
    Auth.signOut()
      .then(data => setUser(null))
      .then(err => console.log(err));
  };

  return authState === AuthState.SignedIn && user ? (
    <div className="container">
      <section className="hero is-primary">
        <div className="hero-body columns">
          <div className="column is-four-fifth">
            <p className="title">
              Form Dialer
            </p>
            <p className="subtitle">
              フォーム入力情報をAmazon Connectで取得
            </p>
          </div>
          <div className="column is-one-fifth" style={{textAlign: "center", paddingTop: "2rem"}}>
            <button className="button is-danger" onClick={signOut}>ログアウト</button>
          </div>
        </div>
      </section>

      <section className="section">
        <h1 className="title">問い合わせフォーム</h1>
        <h2 className="subtitle">
          下記の情報をすべて入力して発信ボタンをクリックしてください。
        </h2>
        <ContactForm />
      </section>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            <strong>Sample Application</strong> by <a href="https://www.geekfeed.co.jp/" target="_blank">GeekFeed Co.,Ltd..</a>
          </p>
        </div>
      </footer>
    </div>
  ) : (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        formFields={[
          { type: "username" },
          { type: "password" },
          { type: "email" }
        ]}
      />
    </AmplifyAuthenticator>
  );
}

export default App;
