import React from "react";
import { calculateLastAccess } from "../services/utils";

const HomePage = () => {
  const user = localStorage.getItem("user");
  const userProfileData = user ? JSON.parse(user) : null;
  const lastAccess = userProfileData.last_access_at;
  const timeDifferenceText = calculateLastAccess(lastAccess);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="bg-black bg-cover bg-center min-h-screen flex items-center stars  sm:bg-[#000004] md:bg-[#0F0F0F]">
      <div className="mx-auto max-w-4xl p-4 ">
        <div className="container-home mx-auto bg-opacity-90 rounded-md p-6 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="sm:order-2 md:order-1">
              <div className="text-white md:text-left sm:text-center">
                <span className="name text-4xl md:text-5xl lg:text-6xl block md:inline">
                  <b>{userProfileData.family.first_name.name}</b>
                  <br />
                  {userProfileData.family.last_name.name}
                </span>
                <span className="mt-4 block md:inline-block">
                  Ativo a pelo menos <b>{timeDifferenceText}</b>.
                </span>
                <div className="sm:inline-flex">
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="bg-white text-black rounded-full mt-6 md:mt-8 py-3 px-6 md:py-4 md:px-8 block md:inline"
                  >
                    Sair da aca.so
                  </button>
                </div>
              </div>
            </div>
            <div className="sm:order-1 md:order-2">
              <div className="bg-profile sm:order-1 h-screen sm:h-auto">
                <div className="flex items-center justify-center profile-space">
                  <img
                    className="img-profile rounded-full sm:mt-6 sm:ml-6 md:mt-2 md:ml-2"
                    src="src/assets/profile.png"
                    alt="Profile"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
