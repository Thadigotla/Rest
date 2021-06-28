import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import "./App.css";
import User from "./pages/users/user";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Restaurent from "./pages/restaurent/restaurent";
import Food from "./pages/food/food";

const client = new ApolloClient({
	uri: "https://fast-iguana-62.hasura.app/v1/graphql",
	cache: new InMemoryCache(),
	headers: { "x-hasura-admin-secret": "SreekanthSecret" },
});

// if ("serviceWorker" in navigator) {
// 	//It will register the service worker in the background asynchronoslyso, it returns a promise
// 	//Register has   also has second option to use by a path
// 	//Service works only on https, but localhost is an exception (Because they are so power we can use securely)
// 	//Manifest and Service workers soesn't jave any relation
// 	navigator.serviceWorker.register("/sw.js").then(function () {
// 		console.log("SErvice worker is present");
// 	});
// }

//For listening, checking the service workers in the browser or not
// function configurePushSub() {
// 	if (!("serviceWorker" in navigator)) {
// 		return;
// 	}

// 	var reg;
// 	navigator.serviceWorker.ready
// 		.then(function (swreg) {
// 			//Checking if the subscription is their or not
// 			return swreg.pushManager.getSubscription();
// 		})
// 		.then(function (sub) {
// 			if (sub == null) {
// 				var vapidPublicKey = "adfasnfdlasldnflds";

// 				var convertedVapidPublicKey = urlBase64ToUint8Array(vapidpublickey);
// 				//create new subscritpion for the given browser, if we have old, it will render the old one useless

// 				reg.pushManagaer.subscribe({
// 					//PUSH NOTIFICATIONS ONLY VISIBLE TO THIS USER ONLY(the valid backend server only will send the notificaitons to this browser)
// 					userVisibleOnly: true,

// 					applicationServerKey: vonvertdVapidPublicKey,
// 				});
// 			} else {
// 				//We have the subscription
// 			}
// 		})
// 		.thenn(function (newSub) {
// 			return fetch("url.json", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json",
// 					Accept: "application/json",
// 				},
// 				body: JSON.stringify(newSub),
// 			});
// 		})
// 		.then(function (res) {
// 			if (res.ok) {
// 				displayConfirmNotificatino();
// 			}
// 		})
// 		.catch(function (err) {
// 			console.log(err);
// 		});
// }

function App() {
	// const notify = () => {};

	// const displayConfirmNotificatino = () => {
	// 	if ("serviceWorker" in navigator) {
	// 		var options = {
	// 			body: "You succesfully subscribed",
	// 			// icon: 'path for icon'
	// 			// image: 'path for image
	// 			//dir:'ltr'
	// 			//lang:'en-US' //BCP 47
	// 			//vibrate:[100, 50, 200]
	// 			//badge: 'path to icons' SHOWS ON NAV BAR if their is notification for the user
	// 			//tag : 'confirm-notification' => They will stack on each other, if their are multiple
	// 			//renotify:false => Notification of same tag won't vibrate
	// 			//Don't relay on below notifcation actions, it won't show in some of the  devices
	// 			//actions : [
	// 			// 	{action:'confirm', title:'Okay', icon:'/'},
	// 			// 	{action:'cancel', title:'Okay', icon:'/'},
	// 			// 	{action:'confirm', title:'Okay', icon:'/'}
	// 			// ]
	// 		};

	// 		navigator.serviceWorker.ready.then(function (swreg) {
	// 			swreg.showNotification("Successfully Subscribed!", options);
	// 		});
	// 	}
	// var options = {
	// 	body: "You succesfully subscribed",
	// };
	// new Notification("Successfully Subscribed!", options);
	// };

	// if ("Notification" in window) {
	// 	//We can also check for notification in window and show the notificaiton button..

	// 	//If we enable notificatin, it also enables to push notification, because they are inter related
	// 	Notification.requestPermission().then((result) => {
	// 		if (result != "granted") {
	// 			console.log("No notifiation permission granted!");
	// 		} else {
	// 			displayConfirmNotificatino();
	// 		}
	// 	});
	// }

	return (
		<>
			<Router>
				<div>
					<ui>
						<li>
							<Link to="/user">Users</Link>
						</li>
						<li>
							<Link to="/restaurent">Restaurent</Link>
						</li>
						<li>
							<Link to="/food">Food</Link>
						</li>

						<li>
							<Link>Others</Link>
						</li>
					</ui>
					{/* <button onClick={notify}>Enable NOTIFICATION</button> */}
				</div>
				<ApolloProvider client={client}>
					<Switch>
						<Route path="/user">
							<User />
						</Route>
						<Route path="/restaurent">
							<Restaurent />
						</Route>
						<Route path="/food">
							<Food />
						</Route>
					</Switch>
				</ApolloProvider>
			</Router>
		</>
	);
}

export default App;
