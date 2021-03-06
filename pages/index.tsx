import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Input, Select, Text, jsx } from "theme-ui";
import useWindowSize from "../lib/useWindows";
import * as fbq from "../lib/fpixel";

/** @jsxRuntime classic */
/** @jsx jsx */

export default function Form() {
  const { height, width } = useWindowSize();
  const [sent, setSent] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const isLarge = width >= 650;
  const imageUrl = isLarge ? "bg-large.jpeg" : "bg-phone.png";
  const onSubmit = async (data) => {
    setLoading(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api", requestOptions);
    if (res.status === 200) {
      setSent(true);
      console.log("data", data);
      fbq.event("ENGAGEMENT", { name: data.name });
    } else {
      setLoading(false);
    }
  };
  const phonePerfix = ["050", "052", "053", "054", "057", "058"];
  return (
    <Box
      sx={{
        color: "primary",
        height: height * 0.97,
        width: width,
        justifyContent: "center",
        alignContent: "center",
        direction: "rtl",
      }}
    >
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>פניקס מוטורס</title>

        {/* Global Site Code Pixel - Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', 211785687293492);
              `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=211785687293492&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>

      <Grid
        sx={{
          background: `url(/${imageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "contain",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box sx={{ height: "80%" }}>
          <Grid
            sx={{
              height: height,
              width: width,
              justifyContent: "center",
              alignContent: "center",
              gridTemplateRows: "2.5fr auto 3fr",
            }}
          >
            <Box>
              <Button
                sx={{ backgrounColor: "#00146C" }}
                onClick={() =>
                  window.location.assign("https://phxmotors.org.il/")
                }
              >
                לאתר
              </Button>
            </Box>
            {sent ? (
              <Text sx={{ fontSize: 4, fontWeight: "bold" }}>טופס נשלח!!!</Text>
            ) : (
              <Grid as="form" onSubmit={handleSubmit(onSubmit)}>
                <Input
                  name="name"
                  placeholder="שם"
                  p={1}
                  sx={{ fontSize: [1, 3] }}
                  ref={register({ required: true })}
                />
                <Input
                  name="lastName"
                  placeholder="שם משפחה"
                  p={1}
                  sx={{ fontSize: [1, 3] }}
                  ref={register({ required: true })}
                />
                <Grid
                  columns={2}
                  sx={{
                    gridTemplateColumns: [
                      "130px 60px",
                      "1fr minmax(auto, 70px)",
                    ],
                  }}
                >
                  <Grid>
                    <Input
                      p={1}
                      name="phone"
                      placeholder="מספר"
                      type="number"
                      sx={{ flexGrow: 1 }}
                      ref={register({
                        required: true,
                        pattern: /^\d{7}$/,
                      })}
                    />
                    {errors.phone?.type === "required" && (
                      <Text sx={{ color: "red", fontWeight: "bold" }}>
                        שדה חובה
                      </Text>
                    )}
                    {errors.phone?.type === "pattern" && (
                      <Text sx={{ color: "red", fontWeight: "bold" }}>
                        רק מספר ללא קידומת (7ספרות)
                      </Text>
                    )}
                  </Grid>
                  <Grid>
                    <Select
                      p={1}
                      sx={{ direction: "ltr" }}
                      ref={register}
                      name={"prefix"}
                    >
                      {phonePerfix.map((p) => (
                        <option value={p} key={p}>
                          {p}
                        </option>
                      ))}
                    </Select>
                    {errors.phone?.type === "required" && <Text>_</Text>}
                    {errors.phone?.type === "pattern" && <Text>_</Text>}
                  </Grid>
                </Grid>
                <Button sx={{ backgrounColor: "#00146C" }} disabled={loading}>
                  שלח
                </Button>
              </Grid>
            )}
            <Box />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
