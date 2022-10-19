import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Tournament from "./pages/Tournament";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RegStepOne from "./pages/RegStepOne";
import Dashboard from "./pages/admin/Dashboard";
import AdminLayout from "./layouts/AdminLayout";
import PermissionList from "./pages/admin/premission/PermissionList";
import NoPermission from "./pages/admin/NoPermission";
import PermissionCreate from "./pages/admin/premission/PermissionCreate";
import PermissionEdit from "./pages/admin/premission/PermissionEdit";
import RoleList from "./pages/admin/role/RoleList";
import RoleCreate from "./pages/admin/role/RoleCreate";
import RolePermissionCreate from "./pages/admin/role/RolePermissionCreate";
import Test2 from "./pages/Test2";
import Test3 from "./pages/Test3";
import CountryCreate from "./pages/admin/country/CountryCreate";
import GameList from "./pages/admin/game/GameList";
import GameCreate from "./pages/admin/game/GameCreate";
import GameEdit from "./pages/admin/game/GameEdit";
import CountryList from "./pages/admin/country/CountryList";
import CountryEdit from "./pages/admin/country/CountryEdit";
import TournamentList from "./pages/admin/tournament/TournamentList";
import TournamentCreate from "./pages/admin/tournament/TournamentCreate";
import TournamentEdit from "./pages/admin/tournament/TournamentEdit";
import BuildTeam from "./pages/BuildTeam";
import PlayerList from "./pages/admin/player/PlayerList";
import PlayerCreate from "./pages/admin/player/PlayerCreate";
import PlayerEdit from "./pages/admin/player/PlayerEdit";
import ViewTeam from "./pages/ViewTeam";
import WelcomeTeam from "./pages/WelcomeTeam";
import SliderList from "./pages/admin/slider/SliderList";
import SliderCreate from "./pages/admin/slider/SliderCreate";
import MatchList from "./pages/admin/match/MatchList";
import MatchCreate from "./pages/admin/match/MatchCreate";
import FranchiseList from "./pages/admin/franchise/FranchiseList";
import FranchiseCreate from "./pages/admin/franchise/FranchiseCreate";
import FranchiseEdit from "./pages/admin/franchise/FranchiseEdit";
import SliderEdit from "./pages/admin/slider/SliderEdit";
import TournamentTeamList from "./pages/admin/tournament_team/TournamentTeamList";
import TournamentTeamCreate from "./pages/admin/tournament_team/TournamentTeamCreate";
import TournamentTeamEdit from "./pages/admin/tournament_team/TournamentTeamEdit";
import MatchEdit from "./pages/admin/match/MatchEdit";
import UserList from "./pages/admin/user/UserList";
import UserCreate from "./pages/admin/user/UserCreate";
import RolePermissionEdit from "./pages/admin/role/RolePermissionEdit";
import NewsList from "./pages/admin/news/NewsList";
import NewsCreate from "./pages/admin/news/NewsCreate";
import NewsEdit from "./pages/admin/news/NewsEdit";
import RolePermissionE from "./pages/admin/role/RolePermissionE";
import LoginAdmin from "./pages/LoginAdmin";
import UserEdit from "./pages/admin/user/UserEdit";
import RoleEdit from "./pages/admin/role/RoleEdit";
import GameTournaments from "./pages/GameTournamets";
import TournamentTeamPlayerCreate from "./pages/admin/tournament_team_player/TournamentTeamPlayerCreate";
import TournamentTeamPlayerList from "./pages/admin/tournament_team_player/TournamentTeamPlayerList";
import TournamentTeamPlayerView from "./pages/admin/tournament_team_player/TournamentTeamPlayerView";
import PointTableCreate from "./pages/admin/point_table/PointTableCreate";
import PointTableList from "./pages/admin/point_table/PointTableList";
import PointTableEdit from "./pages/admin/point_table/PointTableEdit";
import SettingsShow from "./pages/admin/settings/SettingsShow";
import ClubList from "./pages/admin/club/ClubList";
import ClubCreate from "./pages/admin/club/ClubCreate";
import ClubEdit from "./pages/admin/club/ClubEdit";
import Ranking from "./pages/Ranking";

export const UserContext = React.createContext(null);

function App() {
  const [authUser, setAuthUser] = useState({ user: {}, isLoggedIn: false });
  const value = { authUser, setAuthUser };

  useEffect(() => {
    const getLoginData = localStorage.getItem("loginData");
    if (getLoginData != null) {
      const data = JSON.parse(getLoginData);
      const token = data.accessToken;
      if (token !== null) {
        setAuthUser({
          ...authUser,
          user: data,
          isLoggedIn: true,
        });
      }
    }
  }, []);

  return (
    <>
      <UserContext.Provider value={value}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/tournament" element={<Tournament />} />
            <Route path="/game-tournaments" element={<GameTournaments />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin-login" element={<LoginAdmin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register-step-one" element={<RegStepOne />} />
            <Route path="/build-team/:id" element={<BuildTeam />} />
            <Route path="/view-team" element={<ViewTeam />} />
            <Route path="/welcome-team" element={<WelcomeTeam />} />
            <Route path="/ranking" element={<Ranking />} />

            <Route path={`/admin`} element={<AdminLayout />}>
              <Route path={`/admin`} exact={true} element={<Dashboard />} />
              <Route
                path={`/admin/permissions`}
                exact={true}
                element={<PermissionList />}
              />
              <Route
                path={`/admin/permissions/create`}
                exact={true}
                element={<PermissionCreate />}
              />
              <Route
                path={`/admin/permissions/edit/:id`}
                element={<PermissionEdit />}
              />

              <Route
                path={`/admin/roles`}
                exact={true}
                element={<RoleList />}
              />
              <Route
                path={`/admin/roles/create`}
                exact={true}
                element={<RoleCreate />}
              />
              <Route
                path={`/admin/roles/:id`}
                exact={true}
                element={<RoleEdit />}
              />
              <Route
                path={`/admin/roles/permissions/:id`}
                exact={true}
                element={<RolePermissionCreate />}
              />
              <Route
                path={`/admin/roles/permissions/:id/edit`}
                exact={true}
                element={<RolePermissionEdit />}
              />
              <Route
                path={`/admin/roles/permissions/e/:id`}
                exact={true}
                element={<RolePermissionE />}
              />

              <Route
                path={`/admin/games`}
                exact={true}
                element={<GameList />}
              />
              <Route
                path={`/admin/games/create`}
                exact={true}
                element={<GameCreate />}
              />
              <Route
                path={`/admin/games/:id`}
                exact={true}
                element={<GameEdit />}
              />

              <Route
                path={`/admin/countries`}
                exact={true}
                element={<CountryList />}
              />
              <Route
                path={`/admin/countries/create`}
                exact={true}
                element={<CountryCreate />}
              />
              <Route
                path={`/admin/countries/:id`}
                exact={true}
                element={<CountryEdit />}
              />

              <Route
                path={`/admin/tournaments`}
                exact={true}
                element={<TournamentList />}
              />
              <Route
                path={`/admin/tournaments/create`}
                exact={true}
                element={<TournamentCreate />}
              />
              <Route
                path={`/admin/tournaments/:id`}
                exact={true}
                element={<TournamentEdit />}
              />

              <Route
                path={`/admin/players`}
                exact={true}
                element={<PlayerList />}
              />
              <Route
                path={`/admin/players/create`}
                exact={true}
                element={<PlayerCreate />}
              />
              <Route
                path={`/admin/players/:id`}
                exact={true}
                element={<PlayerEdit />}
              />

              <Route
                path={`/admin/sliders`}
                exact={true}
                element={<SliderList />}
              />
              <Route
                path={`/admin/sliders/create`}
                exact={true}
                element={<SliderCreate />}
              />
              <Route
                path={`/admin/sliders/:id`}
                exact={true}
                element={<SliderEdit />}
              />

              <Route
                path={`/admin/matches`}
                exact={true}
                element={<MatchList />}
              />
              <Route
                path={`/admin/matches/create`}
                exact={true}
                element={<MatchCreate />}
              />
              <Route
                path={`/admin/matches/:id`}
                exact={true}
                element={<MatchEdit />}
              />

              <Route
                path={`/admin/franchises`}
                exact={true}
                element={<FranchiseList />}
              />
              <Route
                path={`/admin/franchises/create`}
                exact={true}
                element={<FranchiseCreate />}
              />
              <Route
                path={`/admin/franchises/:id`}
                exact={true}
                element={<FranchiseEdit />}
              />

              <Route
                path={`/admin/tournament-teams`}
                exact={true}
                element={<TournamentTeamList />}
              />
              <Route
                path={`/admin/tournament-teams/create`}
                exact={true}
                element={<TournamentTeamCreate />}
              />
              <Route
                path={`/admin/tournament-teams/:id`}
                exact={true}
                element={<TournamentTeamEdit />}
              />

              <Route
                path={`/admin/users`}
                exact={true}
                element={<UserList />}
              />
              <Route
                path={`/admin/users/create`}
                exact={true}
                element={<UserCreate />}
              />
              <Route
                path={`/admin/users/:id`}
                exact={true}
                element={<UserEdit />}
              />

              <Route path={`/admin/news`} exact={true} element={<NewsList />} />
              <Route
                path={`/admin/news/create`}
                exact={true}
                element={<NewsCreate />}
              />
              <Route
                path={`/admin/news/:id`}
                exact={true}
                element={<NewsEdit />}
              />

              <Route
                path={`/admin/tournament-team-players`}
                exact={true}
                element={<TournamentTeamPlayerList />}
              />
              <Route
                path={`/admin/tournament-team-players/create`}
                exact={true}
                element={<TournamentTeamPlayerCreate />}
              />
              <Route
                path={`/admin/tournament-team-players/view/:id`}
                exact={true}
                element={<TournamentTeamPlayerView />}
              />

              <Route
                path={`/admin/point-tables`}
                exact={true}
                element={<PointTableList />}
              />
              <Route
                path={`/admin/point-tables/create`}
                exact={true}
                element={<PointTableCreate />}
              />
              <Route
                path={`/admin/point-tables/:id`}
                exact={true}
                element={<PointTableEdit />}
              />

              <Route
                path={`/admin/settings`}
                exact={true}
                element={<SettingsShow />}
              />

              <Route
                path={`/admin/clubs`}
                exact={true}
                element={<ClubList />}
              />
              <Route
                path={`/admin/clubs/create`}
                exact={true}
                element={<ClubCreate />}
              />
              <Route
                path={`/admin/clubs/:id`}
                exact={true}
                element={<ClubEdit />}
              />

              <Route
                path={`/admin/no-permission`}
                exact={true}
                element={<NoPermission />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
