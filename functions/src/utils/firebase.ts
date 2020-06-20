import { config } from "../../config";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

firebase.initializeApp(config);
const database = firebase.database();

export { firebase, database };
