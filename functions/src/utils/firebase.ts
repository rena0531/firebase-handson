import { config } from "../../config";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "firebase/storage";

firebase.initializeApp(config);
const database = firebase.database();
const storage = firebase.storage();

export { firebase, database, storage };
