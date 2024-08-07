import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet, setupIonicReact, useIonRouter} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import Proyek from './pages/proyek';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/react/css/normalize.css';
// import '@ionic/react/css/structure.css';
// import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
// import '@ionic/react/css/padding.css';
// import '@ionic/react/css/float-elements.css';
// import '@ionic/react/css/text-alignment.css';
// import '@ionic/react/css/text-transformation.css';
// import '@ionic/react/css/flex-utils.css';
// import '@ionic/react/css/display.css';
/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */
/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';
/* Theme variables */
import './theme/variables.css';
import LoginPage from "./pages/auth/login";
import DetailPage from "./pages/media-detail";
import '@ionic/react/css/palettes/high-contrast.always.css';
import '@ionic/react/css/palettes/high-contrast.system.css';
import MediaPage from "./pages/media";
import MediaDetailPage from "./pages/media-detail";
import {ProtectedRoute} from "./components/routes/protected-route";
import {useEffect} from "react";
import { App as CapApp } from "@capacitor/app";
setupIonicReact();

const App: React.FC = () => {
    const ionRouter = useIonRouter();
    useEffect(() => {
        document.addEventListener("ionBackButton", (ev: any) => {
            ev.detail.register(-1, () => {
                if (!ionRouter.canGoBack()) {
                    CapApp.exitApp();
                }
            });
        });
    }, [ionRouter]);
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route exact
                           path="/proyek"
                           render={() =>
                               <ProtectedRoute>
                                   <Proyek/>
                               </ProtectedRoute>
                           }
                    />
                    <Route exact
                           path="/proyek/:id"
                           render={() =>
                               <ProtectedRoute>
                                   <MediaPage/>
                               </ProtectedRoute>
                           }
                    />
                    <Route exact
                           path="/proyek/:idMedia/:idUser"
                           render={() =>
                               <ProtectedRoute>
                                   <MediaDetailPage/>
                               </ProtectedRoute>
                           }
                    />
                    <Route exact path="/login"><LoginPage/></Route>
                    <Route exact path="/">
                        <Redirect to="/login"/>
                    </Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}

export default App;
