<<<<<<< HEAD
import Main from "./Main";

export default function App() {
  return <Main />;
}
=======
import React from "react";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { Main } from "./Main";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  const [loaded] = useFonts({
    "salsa-regular": require("./fonts/Salsa.ttf"),
    "mt-m": require("./fonts/MontserratAlternates-Medium.ttf"),
    "mt-r": require("./fonts/MontserratAlternates-Regular.ttf"),
    "mt-b": require("./fonts/MontserratAlternates-SemiBold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <Main />
      </Provider>
    </PersistGate>
  );
}

// App.js
// import React, { useEffect } from "react";
// import { useFonts } from "expo-font";
// import { Provider } from "react-redux";
// import { Navigation } from "./Navigation";
// import { store, persistor } from "./redux/store";
// import { PersistGate } from "redux-persist/integration/react";
// import { fetchCurrent } from "./redux/auth/authOperations";

// export default function App() {
//   const [loaded] = useFonts({
//     "salsa-regular": require("./fonts/Salsa.ttf"),
//     "mt-m": require("./fonts/MontserratAlternates-Medium.ttf"),
//     "mt-r": require("./fonts/MontserratAlternates-Regular.ttf"),
//     "mt-b": require("./fonts/MontserratAlternates-SemiBold.ttf"),
//   });

//   useEffect(() => {
//     store.dispatch(fetchCurrent());
//   }, []);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <Navigation />
//       </PersistGate>
//     </Provider>
//   );
// }
>>>>>>> 52ab493bda8fd41e9eaf0887d9f841db4e188caa
