import { useState } from "react";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export function useFranchiseForm() {
    const [loading, setLoading] = useState(false);
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

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        let newErrors: Record<string, string> = {};

        if (!form.franchiseType) newErrors.franchiseType = "Select Franchise Type";
        if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!form.fatherName.trim()) newErrors.fatherName = "Father Name is required";
        if (!form.gender) newErrors.gender = "Select gender";

        if (!form.email.includes("@")) newErrors.email = "Enter valid email";

        if (!/^\d{10}$/.test(form.mobile))
            newErrors.mobile = "Enter valid 10-digit number";

        if (!/^\d{12}$/.test(form.aadhar))
            newErrors.aadhar = "Enter valid 12-digit Aadhar";

        if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan))
            newErrors.pan = "Enter valid PAN No";

        if (!form.address.trim()) newErrors.address = "Address is required";
        if (!form.district.trim()) newErrors.district = "District is required";
        if (!form.tehsil.trim()) newErrors.tehsil = "Tehsil is required";

        if (!/^\d{6}$/.test(form.pincode))
            newErrors.pincode = "Pincode must be 6 digits";

        if (!form.districtApplyingFor.trim())
            newErrors.districtApplyingFor = "This field is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {
        setForm({
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
        setErrors({});
    };

    const submitForm = async () => {
        if (!validate()) return false;
        setLoading(true);
        try {
            const res = await fetch(`${BASE_URL}/api/franchise/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    title: "Registration Successful!",
                    html: `
                        <p>Your franchise form has been submitted.</p>

                        <a href="${data.pdfUrl}"  class="swal2-confirm swal2-styled" 
                          style="color:blue; text-decoration: underline; margin-top:10px; display:inline-block;">
                            Download PDF
                        </a>
                    `,
                    showConfirmButton: false,
                    timer: 30000,
                    didClose: () => {
                        window.location.href = "/";
                    },
                    icon: "success",
                });

                resetForm();
                return true;
            } else {
                Swal.fire("Error", data.error, "error");
                return false;
            }
        } catch (err) {
            Swal.fire("Network Error", "Something went wrong", "error");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        form,
        setForm,
        errors,
        loading,
        submitForm,
    };
}
