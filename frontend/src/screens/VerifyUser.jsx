import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VerifyUser = () => {
  const { userId, token } = useParams();
  const [validUrl, setValidUrl] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/auth/user/${userId}/verify/${token}`);
        const jsonData = await res.json();
        console.log(jsonData.message);
        if (!res.ok) {
          console.log(jsonData.message);
          return;
        }
        setValidUrl(true);
        console.log(jsonData);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      {validUrl ? (
        <div>
          <h1>Email verified successfully!</h1> 
          <br />
          <Link to='/login' className="btn btn-sm btn-primary">Login</Link>
        </div>
      ) : (
        <h1>Invalid Link</h1>
      )}
    </>
  );
};

export default VerifyUser;
