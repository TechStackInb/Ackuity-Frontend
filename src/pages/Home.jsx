<div className="relative">
<div className="flex flex-wrap justify-between">
  <div className="px-4 flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[20%] xl:basis-[20%] 2xl:basis-[20%]">
    <button
      type="button"
      onClick={() =>
        handleClick("Vinod1")
      }
      className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4 py-2 mb-4 ${
        selectedItems.includes("Vinod1")
          ? "text-white bg-[#0a854b]"
          : "bg-black"
      }`}
    >
      Vinod
    </button>
    <button
      type="button"
      onClick={() =>
        handleClick("Rajat1")
      }
      className={`border border-green-500 font-poppins font-normal text-[#FFFFFF] px-4 py-2  ${
        selectedItems.includes("Rajat1")
          ? "text-white bg-[#0a854b]"
          : "bg-black"
      }`}
    >
      Rajat
    </button>
  </div>
  <div className="px-4 flex flex-col basis-full sm:basis-full md:basis-full lg:basis-[30%] xl:basis-[30%] 2xl:basis-[30%]">
    <div className="">
      <button
        onClick={() =>
          toggleMembership(index)
        }
      >
        <ThreeDotsButton />
      </button>
    </div>
  </div>
</div>

{openMembershipIndex === index && (
  <>
    <div
      className="fixed inset-0 bg-black opacity-50 z-40"
      onClick={() =>
        toggleMembership(index)
      }
    />

    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={(e) =>
        e.stopPropagation()
      }
    >
      <div className="relative bg-gray-800 rounded-lg shadow-lg w-80">
        <button
          className="absolute top-2 right-2 text-green-400 bg-[#FFFFFF] rounded-full"
          onClick={() =>
            toggleMembership(index)
          }
          style={{
            width: "29px",
            height: "29px",
            background: "#FFFFFF",
            border:
              "2px solid #31B47663",
            opacity: 1,
          }}
        >
          &times;
        </button>

        <div className="bg-[#1B1E26] text-center text-green-400 py-2 rounded-t-lg">
          <span className="text-base font-poppins font-semibold">
            Group Membership
          </span>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white text-sm font-poppins font-medium">
              2 Members
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex ">
              <div className="flex items-center justify-center text-[black] bg-gray-700 rounded-full">
                <img
                  src={userIcon}
                  alt="icons"
                  style={{
                    width: "47px",
                    height: "47px",
                  }}
                />
              </div>
              <div className="flex flex-col ml-3">
                <span className="text-white block text-base font-poppins font-semibold">
                  Vinod Vasudevan
                </span>
                <span className="text-gray-400 text-sm font-poppins font-normal">
                  Member{" "}
                  <FontAwesomeIcon
                    icon={faAngleDown}
                  />
                </span>
              </div>
            </div>
            <div className="border-t border-gray-600"></div>
            <div className="flex ">
              <div
                className="flex items-center justify-center text-[black] bg-gray-700 rounded-full"
                style={{
                  width: "47px",
                  height: "47px",
                  background: "#FFFFFF",
                  opacity: 1,
                }}
              >
                <img
                  src={userIcon}
                  alt="icons"
                  style={{
                    width: "47px",
                    height: "47px",
                  }}
                />
              </div>
              <div className="flex flex-col ml-3">
                <span className="text-white block text-base font-poppins font-semibold">
                  Rajat Mohanty
                </span>
                <span className="text-gray-400 text-sm font-poppins font-normal">
                  Member{" "}
                  <FontAwesomeIcon
                    icon={faAngleDown}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)}
</div>


function getCsrfTokenFromCookie() {
  const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
  if (match) return match[2];
  return null;
}

axios.post('/api/auth/login', loginData, {
  headers: {
    'X-CSRF-Token': getCsrfTokenFromCookie()  // Attach CSRF token to the request
  },
  withCredentials: true  // Include cookies with the request
})
.then(response => {
  console.log('Login successful', response);
})
.catch(error => {
  console.error('Login failed', error);
});