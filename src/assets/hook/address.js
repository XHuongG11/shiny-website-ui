import { useState, useEffect } from "react";
import addressApi from "../../api/addressApi";


const useAddress = () => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Lấy danh sách tỉnh
    const fetchProvinces = async () => {
        try {
            const response = await addressApi.getListProvinces();
            setProvinces(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách tỉnh:", error);
        }
    };

    // Xử lý khi chọn tỉnh
    const handleProvinceChange = async (event) => {
        try {
            const selectedProvinceValue = event.target.value;
            const province = provinces.find(p => p.name === selectedProvinceValue);

            if (!province) return;

            const response = await addressApi.getProvince(province.code, { depth: 2 });

            setDistricts(response.data.districts || []);
            setWards([]);

        } catch (error) {
            console.error("Lỗi khi lấy danh sách quận/huyện:", error);
        }
    };

    // Xử lý khi chọn huyện
    const handleDistrictChange = async (event) => {
        try {
            const selectedDistrictValue = event.target.value;
            const district = districts.find(d => d.name === selectedDistrictValue);
            if (!district) return;
            const response = await addressApi.getDistrictDepth2(district.code);
            setWards(response.data.wards || []);

        } catch (error) {
            console.error("Lỗi khi lấy danh sách xã/phường:", error);
        }
    };

    useEffect(() => {
        fetchProvinces();
    }, []);

    return {
        provinces,
        districts,
        wards,
        handleProvinceChange,
        handleDistrictChange,
    };
};

export default useAddress;
