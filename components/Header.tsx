import Link from "next/link";
import useUser from "lib/useUser";
import { useRouter } from "next/router";
import Image from "next/image";
import fetchJson from "lib/fetchJson";
import styled from "styled-components";

const UnorderedList = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  margin-left: 0;
  padding: 0 20px;
`;

const StyledHeader = styled.header`
  padding: 0.2rem;
  color: #fff;
  background-color: #333;
`;

const StyledA = styled.a`
  color: #fff;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;

  & img {
    margin-right: 1em;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export default function Header() {
  const { user, mutateUser } = useUser();
  const router = useRouter();

  return (
    <StyledHeader>
      <nav>
        <UnorderedList>
          <li>
            <StyledA href="https://github.com/aliataf/movies-app">
              <Image
                src="/GitHub-Mark-Light-32px.png"
                width="32"
                height="32"
                alt=""
              />
            </StyledA>
          </li>
          <StyledDiv>
            <li>
              <Link href="/">
                <StyledA>Home</StyledA>
              </Link>
            </li>
            {user?.isLoggedIn === false && (
              <li>
                <Link href="/login">
                  <StyledA>Login</StyledA>
                </Link>
              </li>
            )}
            {user?.isLoggedIn === true && (
              <>
                <li>
                  <Link href="/profile-sg">
                    <StyledA
                      href="/api/logout"
                      onClick={async (e) => {
                        e.preventDefault();
                        mutateUser(
                          await fetchJson("/api/logout", { method: "POST" }),
                          false
                        );
                        router.push("/login");
                      }}
                    >
                      <span
                        style={{
                          marginRight: ".3em",
                          verticalAlign: "middle",
                          borderRadius: "100%",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={user.avatarUrl}
                          width={32}
                          height={32}
                          alt=""
                        />
                      </span>
                      Logout
                    </StyledA>
                  </Link>
                </li>
              </>
            )}
          </StyledDiv>
        </UnorderedList>
      </nav>
    </StyledHeader>
  );
}
