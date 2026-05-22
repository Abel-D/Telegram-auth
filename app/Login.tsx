'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image';

export default function TelegramLogin({isAuth,isReg}:{isAuth?:boolean,isReg?:boolean}) {
  const containerRef = useRef(null);
  const [user, setUser] = useState(null);
  const [loading,setLoading]=useState(false);
  const [status,setStatus]=useState('')

  useEffect(() => {
    // 1. Define the global callback function that Telegram expects
    // @ts-ignore
    window.onTelegramAuth = (telegramUser) => {
      console.log('Logged in user details:', telegramUser);
      // telegramUser object contains: id, first_name, last_name, username, photo_url, auth_date, hash
      setUser(telegramUser);
    };

    // 2. Dynamically create the script element
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?23';
    script.async = true;
    
    // Set Telegram specific attributes
    script.setAttribute('data-telegram-login', 'AuthTst'); // TODO: Replace with your actual Bot Username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');

    // 3. Append the script to our container div
    if (containerRef.current) {
      // Clear container first to prevent duplicate widgets during development strict mode
      // @ts-ignore
      containerRef.current.innerHTML = ''; 
      // @ts-ignore
      containerRef.current.appendChild(script);
    }

    // 4. Cleanup function
    return () => {
      // @ts-ignore
      delete window.onTelegramAuth;
    };
  }, []);

  const onTelegramAuth=async()=>{
     setLoading(true)
  }
  return (
    <div className="mt-3" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <img
        className="w-[1.5rem] h-[1.5rem]" 
        style={{borderRadius:"50%"}} 
        src="/next/telegram-icon.png" 
        alt="telegram icon"
        />
      {/* The Telegram button will render inside this div */}
      <div ref={containerRef}></div>

      {/* Display the extracted user details */}
      {user && (
        <div 
           className="w-auto px-3 py-1 rounded-3xl" 
           onClick={(e:any)=>onTelegramAuth}
           style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', maxWidth: '300px' }}>
          <h3>"Login as ":"Register as "{(user && user['first_name'])?user['first_name']: 'N/A'}!</h3>          
          <p><strong>ID:</strong> {(user && user['id'])?user['id']:'N/A'}</p>
          <p><strong>Name:</strong> {(user && user['first_name'] && user['last_name'])?user['first_name']+" "+user['last_name']: 'N/A'}</p>
          <p><strong>Username:</strong> {(user && user['username']) ? `@${user['username']}` : 'N/A'}</p>
          
          {user && user['photo_url'] && (
            <div style={{ marginTop: '10px' }}>
              {/*<strong>Profile Image:</strong><br />
               Using standard img tag here, but you can use next/image if you configure remotePatterns in next.config.js */}
              <img 
                src={(user && user['photo_url'])? user['photo_url']:'N/A'} 
                alt={`${user && user['first_name']}'s profile`} 
                width={60} 
                height={60} 
                style={{ borderRadius: '50%', marginTop: '5px' }}
              />
            </div>
      )}
      {status.length>0 &&
        <span className='mb-3 text-lg font-md text-center text-indigo-500'>{status}</span>
      }
    </div>
  )
}
</div>
  )
}