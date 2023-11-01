var db = firebase.firestore();
var auth = firebase.auth();

function registrarUsuario() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;
  var msg = document.getElementById("message");
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      const userId = user.uid;
      db.collection("usuarios")
        .doc(user.uid)
        .set({
          email: user.email,
          tempo: 60,
          adm: false,
          ip: user.uid,
        })
        .then(() => {
          msg.style.color = "green";
          msg.textContent = "Usuário registrado com sucesso!";
          document.getElementById("password").value = "";
          document.getElementById("email").value = "";
          window.location.href = "" + userId;
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      msg.style.color = "red";
      msg.textContent = ("Erro ao registrar usuário:", errorCode, errorMessage);
    });
}
