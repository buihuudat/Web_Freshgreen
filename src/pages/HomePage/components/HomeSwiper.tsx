import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { CustomSwiperProps } from "../../../types/homeType";
import { Autoplay } from "swiper/modules";

const HomeSwiper: React.FC = () => {
  const swiperProps: CustomSwiperProps = {
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    modules: [Autoplay],
  };
  const temoData: string[] = [
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/dfzmc55-2979427f-2e5c-46f6-bff8-61bda9f9250a.png/v1/fill/w_622,h_350,q_70,strp/no_one_left_by_waltjan_dfzmc55-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZnptYzU1LTI5Nzk0MjdmLTJlNWMtNDZmNi1iZmY4LTYxYmRhOWY5MjUwYS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X3jiQfrxGXI1Mj8Si-V_Q_Yiof1o2vbl0nrGFYQlA-I",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ec5ba75-8c1e-4015-a03a-4258d64a52f4/dfrtnnh-4ede0e7c-c707-4184-8c53-00cc39cb5a84.jpg/v1/fill/w_700,h_350,q_70,strp/snowy_morning_commute_by_redpangolin_dfrtnnh-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvN2VjNWJhNzUtOGMxZS00MDE1LWEwM2EtNDI1OGQ2NGE1MmY0XC9kZnJ0bm5oLTRlZGUwZTdjLWM3MDctNDE4NC04YzUzLTAwY2MzOWNiNWE4NC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.p97KW7n29E8D9h3Rv-8KUVeHgVPhrQx9I1W6szvGNpA",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/dfzmc55-2979427f-2e5c-46f6-bff8-61bda9f9250a.png/v1/fill/w_622,h_350,q_70,strp/no_one_left_by_waltjan_dfzmc55-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZnptYzU1LTI5Nzk0MjdmLTJlNWMtNDZmNi1iZmY4LTYxYmRhOWY5MjUwYS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X3jiQfrxGXI1Mj8Si-V_Q_Yiof1o2vbl0nrGFYQlA-I",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ec5ba75-8c1e-4015-a03a-4258d64a52f4/dfrtnnh-4ede0e7c-c707-4184-8c53-00cc39cb5a84.jpg/v1/fill/w_700,h_350,q_70,strp/snowy_morning_commute_by_redpangolin_dfrtnnh-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvN2VjNWJhNzUtOGMxZS00MDE1LWEwM2EtNDI1OGQ2NGE1MmY0XC9kZnJ0bm5oLTRlZGUwZTdjLWM3MDctNDE4NC04YzUzLTAwY2MzOWNiNWE4NC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.p97KW7n29E8D9h3Rv-8KUVeHgVPhrQx9I1W6szvGNpA",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/dfzmc55-2979427f-2e5c-46f6-bff8-61bda9f9250a.png/v1/fill/w_622,h_350,q_70,strp/no_one_left_by_waltjan_dfzmc55-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZnptYzU1LTI5Nzk0MjdmLTJlNWMtNDZmNi1iZmY4LTYxYmRhOWY5MjUwYS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.X3jiQfrxGXI1Mj8Si-V_Q_Yiof1o2vbl0nrGFYQlA-I",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7ec5ba75-8c1e-4015-a03a-4258d64a52f4/dfrtnnh-4ede0e7c-c707-4184-8c53-00cc39cb5a84.jpg/v1/fill/w_700,h_350,q_70,strp/snowy_morning_commute_by_redpangolin_dfrtnnh-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvN2VjNWJhNzUtOGMxZS00MDE1LWEwM2EtNDI1OGQ2NGE1MmY0XC9kZnJ0bm5oLTRlZGUwZTdjLWM3MDctNDE4NC04YzUzLTAwY2MzOWNiNWE4NC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.p97KW7n29E8D9h3Rv-8KUVeHgVPhrQx9I1W6szvGNpA",
  ];
  return (
    <>
      <Swiper {...swiperProps} className="rounded">
        {temoData.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              style={{
                width: "100%",
                height: 600,
                objectFit: "cover",
                borderRadius: 20,
              }}
              src={image}
              alt="123"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default HomeSwiper;
