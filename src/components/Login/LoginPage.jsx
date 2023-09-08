import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Container,
  Button,
  Stack,
} from "@mantine/core";
import bcrypt from "bcryptjs";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length < 6 ? "Password should include at least 6 characters" : null,
    },
  });

  // Function to handle registration form submission
  const handleSubmit = async (e) => {
    e.preventDefault;

    // Retrieve existing user data from local storage
    const existingUserData = localStorage.getItem("userData");

    // Parse existing data (if any) into an array or initialize as an empty array
    const userDataArray = existingUserData ? JSON.parse(existingUserData) : [];

    if (type === "register") {
      // Hash the password
      const hashedPassword = await bcrypt.hash(form.values.password, 10);

      // Store form values in local storage
      const newUser = {
        email: form.values.email,
        name: form.values.name,
        password: hashedPassword,
        terms: form.values.terms,
      };

      // Check if the email already exists in the array
      const emailExists = userDataArray.some(
        (user) => user.email === newUser.email
      );

      if (emailExists) {
        // Handle email already exists error (you can show a message or perform some action)
        console.error("Email already exists");
      } else {
        // Add the new user to the array
        userDataArray.push(newUser);

        // Store the updated array as a JSON string in local storage
        localStorage.setItem("userData", JSON.stringify(userDataArray));
      }
    }

    if (type === "login") {
      const user = userDataArray.find(
        (user) => user.email === form.values.email
      );

      if (user) {
        // Check if the provided password matches the stored hashed password
        const passwordMatches = await bcrypt.compare(
          form.values.password,
          user.password
        );

        if (passwordMatches) {
          // Password is correct, set authentication status to logged in
          const userData = { name: user.name, email: user.email };
          login(userData);
          navigate("/dashboard");
        } else {
          // Password is incorrect, handle login error
          console.error("Incorrect password");
        }
      } else {
        // User not found, handle login error
        console.error("User not found");
      }
    }
  };

  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Welcome back!
      </Title>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit((e) => handleSubmit(e))}>
          <Stack>
            {type === "register" && (
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) =>
                form.setFieldValue("email", event.currentTarget.value)
              }
              error={form.errors.email && "Invalid email"}
              radius="md"
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) =>
                form.setFieldValue("password", event.currentTarget.value)
              }
              error={
                form.errors.password &&
                "Password should include at least 6 characters"
              }
              radius="md"
            />

            {type === "register" && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) =>
                  form.setFieldValue("terms", event.currentTarget.checked)
                }
              />
            )}
          </Stack>

          <Stack position="apart" mt="xl">
            <Anchor
              component="button"
              type="button"
              color="dimmed"
              onClick={() => toggle()}
              size="md"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" variant="outline" radius="xl">
              {upperFirst(type)}
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginPage;
