import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Input, Select, Text, jsx } from "theme-ui";
import useWindowSize from "../lib/useWindows";
/** @jsxRuntime classic */
/** @jsx jsx */

export default function Form() {
  const { height, width } = useWindowSize();
  const [sent, setSent] = React.useState(false);
  const { register, handleSubmit, watch, errors } = useForm();

  const isLarge = width >= 650;
  const imageUrl = isLarge ? "bg-large.jpeg" : "bg-phone.png";
  const onSubmit = async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const res = await fetch("/api", requestOptions);
    if (res.status === 200) {
      setSent(true);
    }
  };
  const phonePerfix = ["050", "052", "053", "054", "057"];
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
                  <Input
                    p={1}
                    name="phone"
                    placeholder="מספר"
                    sx={{ flexGrow: 1 }}
                    ref={register({ required: true })}
                  />
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
                </Grid>
                <Button sx={{ backgrounColor: "#00146C" }}>שלח</Button>
              </Grid>
            )}
            <Box />
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
}
