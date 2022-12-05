import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { queryClient } from "../../_app";
import styles from "../../../styles/AgentTable.module.css";
import Image from "next/image";
import BackButton from "../../../components/buttons/backButton";

export default function FeedbackTable() {
  console.log("tabless");

  const [status, setStatus] = useState();

  const [butload, setButload] = useState(false);
  const { isLoading, error, data } = useQuery(["FeedbacksUser"], () =>
    fetch("/api/agent/feedbacks/view").then((res) => res.json())
  );

  const feedbackdel = (id) => axios.post("/api/agent/feedbacks/delete", id);
  const mutate = useMutation(feedbackdel, {
    onSuccess: async () => {
      setTimeout(() => {
        setButload(false);
      }, 800);
      setTimeout(() => {
        queryClient.invalidateQueries(["FeedbacksUser"]);
      }, 700);
    },
  });

  if (isLoading) return <>loading</>;

  return (
    <>
      <BackButton />
      {butload && (
        <div className={styles.Loading}>
          <div className={styles.LoadingText}>
            <div>Loading please wait..</div>
          </div>
        </div>
      )}
      <div className={styles.Base}>
        <div className={styles.In}>
          {data.length ? (
            <table className={styles.Table}>
              <thead className={styles.TableHead}>
                <tr className={styles.Tr}>
                  <th colSpan="20" className={styles.MainHead}>
                    Feedbacks from Users
                  </th>
                </tr>

                <tr className={styles.Tr} key="head">
                  {/* <th className={styles.Td}>Id</th> */}
                  <th className={styles.Td}>Name</th>

                  <th className={styles.Td}>Email</th>
                  <th className={styles.Td}>Feedback</th>
                  <th className={styles.Td}>Delete?</th>
                </tr>
              </thead>
              <tbody>
                {data.map((val) => (
                  <tr className={styles.Tr} key={val.id}>
                    {console.log(val)}
                    {/* <td className={styles.Td}>{val.id}</td> */}
                    <td className={styles.Td}>{val.name}</td>

                    <td className={styles.Td}>{val.email}</td>
                    <td
                      className={styles.Td}
                      style={{ minWidth: "1rem", maxWidth: "10vw" }}
                    >
                      {val.content}
                    </td>
                    <td className={styles.Td}>
                      <>
                        <button
                          className={styles.Button}
                          onClick={() => {
                            setButload(!butload);
                            setStatus("Loading....");
                            mutate.mutate({ id: val.id });
                          }}
                        >
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            {butload && (
                              <Image
                                src={"/spinner.svg"}
                                height={"30px"}
                                width={"30px"}
                              />
                            )}
                            Delete
                          </div>
                        </button>
                      </>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <>
              <div>
                {/* <div style={{ display: "flex", marginLeft: 100 }}>
                  <BackButton />
                </div> */}
                <div
                  className={styles.Nofeed}
                  style={{ textAlign: "center", fontSize: 30 }}
                >
                  There are no feedbacks yet!
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
