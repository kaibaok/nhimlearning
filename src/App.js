import React, { Suspense, useEffect, useState } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
// COMPONENT
import AdminLayout from "./layout/AdminLayout";
// LIB
import history from "./lib/history";
// FETCH
import AppAuth from "./AppAuth";
import PageNotFound from "./views/PageNotFound";
import UserLayout from "./layout/UserLayout";
import HomePage from "./views/user/HomePage";
import EnglishBooks from "./views/user/EnglishBooks";
import EnglishBook from "./views/user/EnglishBooks/EnglishBook";
import EnglishBookAdmin from "./views/admin/learning/EnglishBooks";
import Lesson from "./views/user/EnglishBooks/Lesson";
import AdminLogin from "./views/admin/login/AdminLogin";
import Logout from "./views/admin/logout/Logout";
import AdminRegister from "./views/admin/register/AdminRegister";
import Media from "./views/widgets/media/Media";
import LessonAdmin from "./views/admin/learning/Lesson";
import QuestionAdmin from "./views/admin/learning/Question";
import QuestionTypeAdmin from "./views/admin/learning/QuestionType";
import EditQuestionType from "./views/admin/learning/EditQuestionType";
import EditLesson from "./views/admin/learning/EditLesson";
import EditEnglishBook from "./views/admin/learning/EditEnglishBook";
import EditQuestion from "./views/admin/learning/EditQuestion";
import Devices from "./views/admin/devices/Devices";
import NewEditDevice from "./views/admin/devices/NewEditDevice";
import Areas from "./views/admin/areas/Areas";
import EditArea from "./views/admin/areas/EditArea";
import TypesDevice from "./views/admin/types_devices/TypesDevice";
import EditTypesDevice from "./views/admin/types_devices/EditTypesDevice";
import Chat from "./views/admin/chat/Chat";
import Home from "./views/admin/home/Home";

const LOGGED_IN_STATE = {
  UNKNOWN: 0,
  LOGGED_IN: 1,
  LOGGED_OUT: 2,
};

function App(props) {
  const [loggedInState, setLoggedInState] = useState(LOGGED_IN_STATE.UNKNOWN);

  useEffect(() => {
    AppAuth.getUserInfo()
      .then((json) => {
        setLoggedInState(LOGGED_IN_STATE.LOGGED_IN);
      })
      .catch((ex) => {
        setLoggedInState(LOGGED_IN_STATE.LOGGED_OUT);
      });
  }, []);

  return (
    <>
      <BrowserRouter history={history}>
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={
                <UserLayout
                  parentClass="theme-1" // dark-theme primay_bg , theme-1
                  component={HomePage}
                />
              }
            />
            <Route
              path="/english-books"
              element={
                <UserLayout
                  parentClass="theme-1" // dark-theme primay_bg , theme-1
                  component={EnglishBooks}
                />
              }
            />
            <Route
              path="/english-book/:id"
              element={
                <UserLayout
                  parentClass="theme-1" // dark-theme primay_bg , theme-1
                  component={EnglishBook}
                />
              }
            />
            <Route
              path="/lesson/:id/:english_book_id"
              element={
                <UserLayout
                  parentClass="theme-1" // dark-theme primay_bg , theme-1
                  component={Lesson}
                />
              }
            />

            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/logout" element={<Logout />} />
            <Route path="/admin" element={<AdminLayout component={Home} />} />
            <Route
              path="/admin/media"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={Media} />
                )
              }
            />
            <Route
              path="/admin/english-books"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EnglishBookAdmin} />
                )
              }
            />
            <Route
              path="/admin/lessons"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={LessonAdmin} />
                )
              }
            />
            <Route
              path="/admin/questions"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={QuestionAdmin} />
                )
              }
            />
            <Route
              path="/admin/question-types"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={QuestionTypeAdmin} />
                )
              }
            />
            <Route
              path="/admin/question-types"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={QuestionTypeAdmin} />
                )
              }
            />
            <Route
              path="/admin/new-question-type"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditQuestionType} />
                )
              }
            />
            <Route
              path="/admin/edit-question-type/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditQuestionType} />
                )
              }
            />
            <Route
              path="/admin/new-lesson"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditLesson} />
                )
              }
            />
            <Route
              path="/admin/edit-lesson/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditLesson} />
                )
              }
            />
            <Route
              path="/admin/new-english-book"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditEnglishBook} />
                )
              }
            />

            <Route
              path="/admin/edit-english-book/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditEnglishBook} />
                )
              }
            />
            <Route
              path="/admin/new-question"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditQuestion} />
                )
              }
            />

            <Route
              path="/admin/edit-question/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditQuestion} />
                )
              }
            />

            <Route
              path="/admin/devices"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={Devices} />
                )
              }
            />
            <Route
              path="/admin/new-device"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={NewEditDevice} />
                )
              }
            />

            <Route
              path="/admin/edit-device/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={NewEditDevice} />
                )
              }
            />

            <Route
              path="/admin/edit-area/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditArea} />
                )
              }
            />

            <Route
              path="/admin/areas"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={Areas} />
                )
              }
            />
            <Route
              path="/admin/new-area"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditArea} />
                )
              }
            />
            <Route
              path="/admin/types-device"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={TypesDevice} />
                )
              }
            />
            <Route
              path="/admin/new-types-device"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditTypesDevice} />
                )
              }
            />
            <Route
              path="/admin/edit-types-device/:id"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={EditTypesDevice} />
                )
              }
            />
            <Route
              path="/admin/chat"
              element={
                loggedInState !== LOGGED_IN_STATE.LOGGED_IN ? (
                  <PageNotFound />
                ) : (
                  <AdminLayout component={Chat} />
                )
              }
            />

            <Route
              path="/admin/register"
              name="Register"
              element={<AdminRegister />}
            />
            <Route path="*" name="PageNotFound" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
