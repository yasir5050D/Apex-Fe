import LogoIcon from "@/components/icons/LogoIcon";
import { useFranchiseForm } from "../hooks/useFranchiseForm";

export default function FranchiseRegisterPage() {
    const { form, setForm, errors, loading, submitForm } = useFranchiseForm();

    const cancelButton = () => {
        if (window.confirm("Cancel registration?")) {
            window.location.href = "/";
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-xl mt-10">

            {/* HEADER */}
            <header className="flex items-center justify-center mb-10">
                <div className="flex items-center gap-3">
                    <LogoIcon className="h-10 w-auto text-indigo-600" />
                    <div className="leading-tight">
                        <h1 className="font-bold text-2xl">Abacus <span className="text-green-600">Learning</span></h1>
                        <p className="text-xs text-gray-500 -mt-1">By Career Ready J&K</p>
                    </div>
                </div>
            </header>

            <h3 className="text-2xl font-bold text-center mb-6">Franchise Registration</h3>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm();
                }}
                className="space-y-6"
            >

                {/* Franchise Type */}
                <Field label="Franchise Type" error={errors.franchiseType}>
                    <select
                        className="w-full p-3 border rounded"
                        value={form.franchiseType}
                        onChange={(e) => setForm({ ...form, franchiseType: e.target.value })}
                    >
                        <option value="">Select Franchise Type</option>
                        <option value="District Franchise">District Franchise</option>
                        <option value="Unit Franchise">Unit Franchise</option>
                    </select>
                </Field>

                {/* Full Name */}
                <Field label="Full Name" error={errors.fullName}>
                    <input
                        className="w-full p-3 border rounded"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    />
                </Field>

                {/* Father Name */}
                <Field label="Father Name" error={errors.fatherName}>
                    <input
                        className="w-full p-3 border rounded"
                        value={form.fatherName}
                        onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                    />
                </Field>

                {/* Gender */}
                <Field label="Gender" error={errors.gender}>
                    <select
                        className="w-full p-3 border rounded"
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </Field>

                {/* Email + Mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Field label="Email" error={errors.email}>
                        <input
                            type="email"
                            className="w-full p-3 border rounded"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                    </Field>

                    <Field label="Mobile" error={errors.mobile}>
                        <input
                            maxLength={10}
                            className="w-full p-3 border rounded"
                            value={form.mobile}
                            onChange={(e) =>
                                setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })
                            }
                        />
                    </Field>
                </div>

                {/* Aadhar + PAN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Aadhar No" error={errors.aadhar}>
                        <input
                            maxLength={12}
                            className="w-full p-3 border rounded"
                            value={form.aadhar}
                            onChange={(e) =>
                                setForm({ ...form, aadhar: e.target.value.replace(/\D/g, "") })
                            }
                        />
                    </Field>

                    <Field label="PAN No" error={errors.pan}>
                        <input
                            maxLength={10}
                            className="w-full p-3 border rounded uppercase"
                            value={form.pan}
                            onChange={(e) =>
                                setForm({ ...form, pan: e.target.value.toUpperCase() })
                            }
                        />
                    </Field>
                </div>

                {/* Address */}
                <Field label="Address" error={errors.address}>
                    <textarea
                        className="w-full p-3 border rounded"
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                    />
                </Field>

                {/* District + Tehsil + Pincode */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="District" error={errors.district}>
                        <input
                            className="w-full p-3 border rounded"
                            value={form.district}
                            onChange={(e) => setForm({ ...form, district: e.target.value })}
                        />
                    </Field>

                    <Field label="Tehsil" error={errors.tehsil}>
                        <input
                            className="w-full p-3 border rounded"
                            value={form.tehsil}
                            onChange={(e) => setForm({ ...form, tehsil: e.target.value })}
                        />
                    </Field>

                    <Field label="Pincode" error={errors.pincode}>
                        <input
                            maxLength={6}
                            className="w-full p-3 border rounded"
                            value={form.pincode}
                            onChange={(e) =>
                                setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })
                            }
                        />
                    </Field>
                </div>

                {/* District Applying For */}
                <Field label="District Applying For" error={errors.districtApplyingFor}>
                    <input
                        className="w-full p-3 border rounded"
                        value={form.districtApplyingFor}
                        onChange={(e) =>
                            setForm({ ...form, districtApplyingFor: e.target.value })
                        }
                    />
                </Field>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full p-3 rounded font-semibold flex items-center justify-center gap-2
        ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
                    >
                        {loading ? (
                            <>
                                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                Processing...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>


                    <button
                        type="button"
                        disabled={loading}
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


// 🔹 Small Reusable Field Component
const Field = ({ label, error, children }) => (
    <div>
        <label className="font-medium">{label}</label>
        {children}
        {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
);
