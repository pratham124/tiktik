<img src="utils/tiktik-logo.png">
<h1>TikTik</h1>

<p>A social media application where users can upload videos, like videos, comment on videos, and search for users or videos. </p>
<br/>
<p><strong>Link to project:</strong>TBD</p>

<h2>Installation</h2>
<strong>Download the ZIP or:</strong>
<span>https://github.com/pratham124/tiktok-clone.git</span>
<br/>
<strong>Then install dev dependencies:</strong>
<span>npm install</span>
<br/>
<strong>Then run the script:</strong>
<span>npm run build</span>
<span>npm run start</span>

<h2>How It's Made:</h2>
<span><strong>Tech used: </strong>HTML, CSS, TypeScript, React, Next, Redux, Sanity</span>
<br/>
<br/>
<strong>Why was this stack chosen?</strong>
<br/>
<Redux>TypeScript was used to ensure that no data type errors occur. I used Next instead of just React, because I find it easier to create page routes, and the pages are pre-rendered; Leading to improved SEO and performance. Also, with the next api routes feature, I can connect to a backend endpoint. Redux was used to manage the user and allUsers state over multiple components. I could have used useContext instead, but I find redux to be easier. Additionally, with the redux-persist package it makes persisting the state to local storage easier to implement. Since I have not explored the backend side of things yet, I ended up using Sanity to create a database. I could have used Firebase instead, but I prefer the user experience that Sanity provides.</p>
