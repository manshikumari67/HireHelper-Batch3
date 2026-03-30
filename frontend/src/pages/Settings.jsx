import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Settings = () => {

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // 🔥 added

  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await api.put("/user/update", user);
      setUser(res.data.user);
      setEdit(false);
      toast.success("Profile updated");
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUser(prev => ({
      ...prev,
      profile_picture: URL.createObjectURL(file)
    }));

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.put("/user/update-profile-pic", formData);
      setUser(res.data.user);

    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveImage = async () => {
    try {
      const res = await api.delete("/user/remove-profile-pic");
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 UPDATED DELETE (no alert)
  const handleDeleteAccount = async () => {
    try {
      await api.delete("/user/delete-account");

      toast.success("Account deleted");

      localStorage.removeItem("token");
      localStorage.removeItem("email");

      navigate("/login");

    } catch (err) {
      toast.error("Failed to delete account");
    }
  };

  if (!user) return <div className="ml-56 p-6">Loading...</div>;

  return (
    <div className="ml-1 min-h-screen bg-gray-50">

      <div className="max-w-3xl mx-auto p-6 space-y-6">

        {/* PROFILE */}
        <div className="bg-white rounded-xl border p-6">
          <h2 className="text-lg font-semibold mb-4">Profile Picture</h2>

          <div className="flex items-center gap-4">

            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
              {user.profile_picture ? (
                <img src={user.profile_picture} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
                  {user.first_name?.[0]}
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">

              <label className="bg-blue-500 text-white px-4 py-1.5 rounded-md text-sm cursor-pointer">
                Change Photo
                <input type="file" onChange={handleImageChange} className="hidden" />
              </label>

              <button onClick={handleRemoveImage} className="text-sm text-gray-600">
                Remove
              </button>

            </div>

          </div>

          <p className="text-xs text-gray-400 mt-3">
            JPG, PNG up to 5MB
          </p>
        </div>

        {/* PERSONAL INFO */}
        <div className="bg-white rounded-xl border p-6 shadow-sm">

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Personal Information</h2>

            <button
              onClick={() => {
                setEdit(!edit);
                if (edit) fetchUser();
              }}
              className="text-blue-500 text-sm"
            >
              {edit ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="space-y-5">

            <div className="grid grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  disabled={!edit}
                  name="first_name"
                  value={user.first_name || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  disabled={!edit}
                  name="last_name"
                  value={user.last_name || ""}
                  onChange={handleChange}
                  className="mt-1 w-full border px-3 py-2 rounded-lg text-sm"
                />
              </div>

            </div>

            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                disabled
                name="email_id"
                value={user.email_id || ""}
                className="mt-1 w-full border px-3 py-2 rounded-lg bg-gray-100 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone Number</label>
              <input
                disabled={!edit}
                name="phone_number"
                value={user.phone_number || ""}
                onChange={handleChange}
                className="mt-1 w-full border px-3 py-2 rounded-lg text-sm"
              />
            </div>

            {edit && (
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-5 py-2 rounded-lg text-sm"
              >
                Save Changes
              </button>
            )}

          </div>
        </div>

        {/* SECURITY */}
        <div className="bg-white rounded-xl border p-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Account Security</h2>
            <p className="text-sm text-gray-500">
              Change your password securely using OTP verification
            </p>
          </div>

          <button
            onClick={() => navigate("/change-password/email")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            Change Password
          </button>
        </div>

        {/* DANGER ZONE */}
        <div className="bg-white rounded-xl border p-6">

          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Danger Zone
          </h2>

          <p className="text-sm text-gray-500 mb-4">
            Deleting your account will permanently remove all your data.
            This action cannot be undone.
          </p>

          <button
            onClick={() => setShowDeleteModal(true)} // 🔥 changed
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm transition"
          >
            Delete Account
          </button>

        </div>

      </div>

      {/* 🔥 DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-[350px] text-center">

            <h2 className="text-lg font-semibold text-red-600 mb-2">
              Delete Account?
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              Do you want to delete your account permanently?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="border px-4 py-2 rounded"
              >
                No
              </button>

              <button
                onClick={handleDeleteAccount}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Yes
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Settings;