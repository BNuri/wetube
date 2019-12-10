import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentBtn = document.querySelectorAll("#jsDeleteComment");

const increaseNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerText = parseInt(commentNumber.innerHTML, 10) - 1;
};

// ADD COMMENT

const addComment = comment => {
  const li = document.createElement("li");
  const commentSpan = document.createElement("span");
  commentSpan.innerHTML = comment;
  li.appendChild(commentSpan);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment, response);
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

// DELETE COMMENT

const deleteCommentFront = target => {
  const span = target.parentElement;
  const li = span.parentElement;
  commentList.removeChild(li);
  decreaseNumber();
};

const deleteComment = async event => {
  const { target } = event;
  const commentId = target.id;
  const response = await axios({
    url: `/api/comment/delete`,
    method: "POST",
    data: {
      commentId
    }
  });
  if (response.status === 200) {
    deleteCommentFront(target);
  }
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentBtn.forEach(el => el.addEventListener("click", deleteComment));
}

if (addCommentForm) {
  init();
}
