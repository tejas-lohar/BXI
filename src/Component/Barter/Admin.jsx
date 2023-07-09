import React, { useState } from "react";
import axios from "axios";
import {
  Grid,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const Admin = () => {
  const [name, setName] = useState("");
  const [fields, setFields] = useState([]);

  const addCategory = async () => {
    console.log(name, fields);
    await axios
      .post("/category", {
        name: name,
        traits: fields,
      })
      .then((res) => {
        console.log("====>", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Paper elevation={0}>
      <Typography>Admin</Typography>
      <TextField
        type="text"
        label="ADD CATEGORY"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          setFields([
            ...fields,
            {
              //TODO change this to uuid
              id: Math.random() * 10000000,
              name: name,
              options: [],
            },
          ]);
        }}
      >
        <AddIcon />
      </button>
      <button onClick={addCategory}>Log</button>
      <Grid container mt={5}>
        <Grid item xl={6} lg={6} md={6}>
          {fields.map((e, idx) => (
            <div>
              <input
                value={e.name}
                onChange={(event) => {
                  setFields((fields) =>
                    fields.map((f) => {
                      if (f.id === e.id) {
                        return {
                          id: f.id,
                          name: event.target.value,
                          options: f.options,
                        };
                      } else {
                        return f;
                      }
                    })
                  );
                }}
              />
              <div>
                {e.options.map((t, j) => (
                  <input
                    value={t}
                    onChange={(event) => {
                      setFields((fields) =>
                        fields.map((f) => {
                          if (f.id === e.id) {
                            return {
                              id: f.id,
                              name: f.name,
                              options: f.options.map((tr, idx) => {
                                if (idx === j) {
                                  return event.target.value;
                                } else {
                                  return tr;
                                }
                              }),
                            };
                          } else {
                            return f;
                          }
                        })
                      );
                    }}
                  />
                ))}
                <button
                  onClick={() => {
                    setFields((fields) =>
                      fields.map((f, fidx) => {
                        if (idx === fidx) {
                          return {
                            id: f.id,
                            name: f.name,
                            options: [...f.options, ""],
                          };
                        } else {
                          return {
                            id: f.id,
                            name: f.name,
                            options: [...f.options],
                          };
                        }
                      })
                    );
                  }}
                >
                  Add New Trait
                </button>
              </div>
            </div>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Admin;
