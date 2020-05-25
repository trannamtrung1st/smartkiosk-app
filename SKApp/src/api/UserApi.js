import { API } from "$constants";
import AsyncStorage from "@react-native-community/async-storage";
import { authFetch, toQuery } from "$app-helpers";
import messaging from "@react-native-firebase/messaging";
import { G } from "$global";

function login(model, response, error, final) {
  authFetch(API.endpoint + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(model),
  })
    .then(response)
    .catch(error)
    .finally(final);
}

function saveToken(tokenModel, success, error) {
  AsyncStorage.setItem("token", JSON.stringify(tokenModel))
    .then((v) => {
      messaging()
        .subscribeToTopic(tokenModel.user_id)
        .then((v) => {
          if (success) success(v);
        });
    })
    .catch(error);
}

export default {
  login,
  saveToken,
};
