import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { SessionProvider } from "./components/contexts/SessionContext.jsx";
import { SearchProvider } from "./components/contexts/SearchContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<SessionProvider>
			<SearchProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</SearchProvider>
		</SessionProvider>
	</React.StrictMode>
);
