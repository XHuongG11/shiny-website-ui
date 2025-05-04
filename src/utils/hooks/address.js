import { useState } from "react";
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
    const handleProvinceChange = async (value) => {
        try {
            const province = provinces.find(p => p.name === value);

            if (!province) return;
            const response = await addressApi.getProvince(province.code, { depth: 2 });

            setDistricts(response.data.districts || []);
            setWards([]);

        } catch (error) {
            console.error("Lỗi khi lấy danh sách quận/huyện:", error);
        }
    };

    // Xử lý khi chọn huyện
    const handleDistrictChange = async (value) => {
        try {
            const district = districts.find(d => d.name === value);
            if (!district) return;
            const response = await addressApi.getDistrictDepth2(district.code);
            setWards(response.data.wards || []);

        } catch (error) {
            console.error("Lỗi khi lấy danh sách xã/phường:", error);
        }
    };
    
    const loadAddress = async (address) => {
        try {
            if (address) {
                const provincesResponse = await addressApi.getListProvinces();

                const province = provincesResponse.data.find(p => p.name === address?.province);
                // console.log("provinces", provincesResponse.data);
                if (!province) return;

                const districtsResponse = await addressApi.getProvince(province.code, { depth: 2 })
                // console.log("districts", districtsResponse.data);
                const district = districtsResponse.data.districts.find(d => d.name === address?.district);
                if (!district) return;

                const wardsResponse = await addressApi.getDistrictDepth2(district.code);
                // console.log("wards", wardsResponse.data.wards);

                setProvinces(provincesResponse.data);
                setDistricts(districtsResponse.data.districts || []);
                setWards(wardsResponse.data.wards || []);
            }
        } catch (error) {
            console.error("Lỗi khi lấy danh sách xã/phường:", error);

        }
    };

    return {
        provinces,
        districts,
        wards,
        handleProvinceChange,
        handleDistrictChange,
        fetchProvinces,
        loadAddress,
    };
};

export default useAddress;
