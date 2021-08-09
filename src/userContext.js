import React, { useEffect, useState } from "react";
import { app } from "./firebase/";

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(false);
	const [pending, setPending] = useState(true);
	const [loggedIN, setLoggedIN] = useState(false);

	useEffect(() => {
		app.auth().onAuthStateChanged((user) => {
			if (user) {
				setCurrentUser(user);
				setLoggedIN(true);
				localStorage.setItem("whoglo_user", user.uid);
			}

			
		});
	}, []);

	if (pending) {
		return <h2>Loading....</h2>;
	}
	return (
		<UserContext.Provider
			value={{
				currentUser,
				loggedIN,
				setLoggedIN,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export function UserConsumer({ children }) {
	return <UserContext.Consumer>{children}</UserContext.Consumer>;
}
