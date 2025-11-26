import LogoIcon from "@/components/icons/LogoIcon";
import React, { useState } from "react";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function FranchiseRegisterForm() {

      const cancelButton = () => {
        if (window.confirm('Cancel registration?')) window.location.href = '/';
    };
    
    const [form, setForm] = useState({
        franchiseType: "",
        fullName: "",
        fatherName: "",
        gender: "",
        email: "",
        aadhar: "",
        pan: "",
        mobile: "",
        address: "",
        district: "",
        tehsil: "",
        pincode: "",
        districtApplyingFor: "",
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors: Record<string, string> = {};

        if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!form.fatherName.trim()) newErrors.fatherName = "Father Name is required";

        if (!form.gender) newErrors.gender = "Select gender";

        if (!form.email.includes("@"))
            newErrors.email = "Enter valid email";

        if (!/^\d{10}$/.test(form.mobile))
            newErrors.mobile = "Enter valid 10–digit mobile number";

        if (!/^\d{12}$/.test(form.aadhar))
            newErrors.aadhar = "Enter 12 digit Aadhar number";

        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan))
            newErrors.pan = "Enter valid PAN number";

        if (!form.address.trim())
            newErrors.address = "Address is required";

        if (!form.district.trim())
            newErrors.district = "District is required";

        if (!form.tehsil.trim())
            newErrors.tehsil = "Tehsil is required";

        if (!/^\d{6}$/.test(form.pincode))
            newErrors.pincode = "Enter valid 6 digit pincode";

        if (!form.districtApplyingFor.trim())
            newErrors.districtApplyingFor = "This field is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            const res = await fetch(`${BASE_URL}/api/franchise/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    title: "Success",
                    text: "Form submitted successfully",
                    icon: "success",
                    confirmButtonColor: "#6366F1",
                });

                if (data.pdfUrl) window.open(data.pdfUrl, "_blank");

                setForm({
                    fullName: "",
                    fatherName: "",
                    gender: "",
                    email: "",
                    aadhar: "",
                    pan: "",
                    mobile: "",
                    address: "",
                    district: "",
                    tehsil: "",
                    pincode: "",
                    districtApplyingFor: "",
                });

            } else {
                Swal.fire("Error", data.error, "error");
            }
        } catch (err) {
            Swal.fire("Network Error", "Try again later", "error");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl mt-10">
            {/* HEADER */}
            <header className="max-w-4xl mx-auto flex items-center justify-center mb-10 animate-fadeIn">
                <div className="flex items-center gap-3">
                    <LogoIcon className="h-10 w-auto text-indigo-600 drop-shadow-sm" />

                    <div className="leading-tight">
                        <h1 className="font-bold text-2xl text-gray-900 tracking-tight">
                            Abacus <span className="text-green-600">Learning</span>
                        </h1>
                        <p className="text-xs text-gray-500 -mt-1">By Career Ready J&K</p>
                    </div>
                </div>
            </header>
            <h3 className="text-2xl font-bold text-center mb-6">
                Franchise Registration
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Franchise Type */}
                <div>
                    <label className="block mb-1 font-medium">Franchise Type</label>
                    <select
                        className="w-full p-3 border rounded"
                        value={form.franchiseType}
                        onChange={(e) =>
                            setForm({ ...form, franchiseType: e.target.value })
                        }
                    >
                        <option value="">Select Franchise Type</option>
                        <option value="District Franchise">District Franchise</option>
                        <option value="Unit Franchise">Unit Franchise</option>
                    </select>
                    {errors.franchiseType && (
                        <p className="text-red-600 text-sm">{errors.franchiseType}</p>
                    )}
                </div>


                {/* full name */}
                <div>
                    <label className="font-medium">Full Name</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={form.fullName}
                        onChange={(e) =>
                            setForm({ ...form, fullName: e.target.value })
                        }
                    />
                    {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName}</p>}
                </div>

                {/* father name */}
                <div>
                    <label className="font-medium">Father Name</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={form.fatherName}
                        onChange={(e) =>
                            setForm({ ...form, fatherName: e.target.value })
                        }
                    />
                    {errors.fatherName && <p className="text-red-600 text-sm">{errors.fatherName}</p>}
                </div>

                {/* gender */}
                <div>
                    <label className="font-medium">Gender</label>
                    <select
                        className="w-full p-3 border rounded"
                        value={form.gender}
                        onChange={(e) =>
                            setForm({ ...form, gender: e.target.value })
                        }
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.gender && <p className="text-red-600 text-sm">{errors.gender}</p>}
                </div>

                {/* Email + Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 border rounded"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Mobile Number</label>
                        <input
                            maxLength={10}
                            className="w-full p-3 border rounded"
                            value={form.mobile}
                            onChange={(e) =>
                                setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })
                            }
                        />
                        {errors.mobile && <p className="text-red-600 text-sm">{errors.mobile}</p>}
                    </div>
                </div>

                {/* Aadhar + PAN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-medium">Aadhar No</label>
                        <input
                            maxLength={12}
                            className="w-full p-3 border rounded"
                            value={form.aadhar}
                            onChange={(e) =>
                                setForm({ ...form, aadhar: e.target.value.replace(/\D/g, "") })
                            }
                        />
                        {errors.aadhar && <p className="text-red-600 text-sm">{errors.aadhar}</p>}
                    </div>

                    <div>
                        <label className="font-medium">PAN No</label>
                        <input
                            maxLength={10}
                            className="w-full p-3 border rounded uppercase"
                            value={form.pan}
                            onChange={(e) =>
                                setForm({ ...form, pan: e.target.value.toUpperCase() })
                            }
                        />
                        {errors.pan && <p className="text-red-600 text-sm">{errors.pan}</p>}
                    </div>
                </div>

                {/* Address */}
                <div>
                    <label className="font-medium">Address</label>
                    <textarea
                        className="w-full p-3 border rounded"
                        value={form.address}
                        onChange={(e) =>
                            setForm({ ...form, address: e.target.value })
                        }
                    ></textarea>
                    {errors.address && <p className="text-red-600 text-sm">{errors.address}</p>}
                </div>

                {/* District + Tehsil + Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <div>
                        <label className="font-medium">District</label>
                        <input
                            className="w-full p-3 border rounded"
                            value={form.district}
                            onChange={(e) =>
                                setForm({ ...form, district: e.target.value })
                            }
                        />
                        {errors.district && <p className="text-red-600 text-sm">{errors.district}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Tehsil</label>
                        <input
                            className="w-full p-3 border rounded"
                            value={form.tehsil}
                            onChange={(e) =>
                                setForm({ ...form, tehsil: e.target.value })
                            }
                        />
                        {errors.tehsil && <p className="text-red-600 text-sm">{errors.tehsil}</p>}
                    </div>

                    <div>
                        <label className="font-medium">Pincode</label>
                        <input
                            maxLength={6}
                            className="w-full p-3 border rounded"
                            value={form.pincode}
                            onChange={(e) =>
                                setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
                            }
                        />
                        {errors.pincode && <p className="text-red-600 text-sm">{errors.pincode}</p>}
                    </div>
                </div>


                {/* District Applying For */}
                <div>
                    <label className="font-medium">District Applying For</label>
                    <input
                        className="w-full p-3 border rounded"
                        value={form.districtApplyingFor}
                        onChange={(e) =>
                            setForm({ ...form, districtApplyingFor: e.target.value })
                        }
                    />
                    {errors.districtApplyingFor && (
                        <p className="text-red-600 text-sm">{errors.districtApplyingFor}</p>
                    )}
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white p-3 rounded font-semibold hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                    <button
                        type="button"
                        onClick={cancelButton}
                        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
