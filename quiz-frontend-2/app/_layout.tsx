// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return <Stack />;
// }

// creates graphql client
// wraps the whole app so every screen can use it 

//  connects frontend to the graphql backend
import { Stack } from "expo-router";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { ApolloProvider } from '@apollo/client/react'; 
// makes client available everywhere

// Replace '192.168.x.x' with your computer's actual IP address
const client = new ApolloClient({
  //  connects our app to backend graphql server
  link: new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  cache: new InMemoryCache(),
});

export default function RootLayout() {
  return (
    <ApolloProvider client={client}>
      <Stack screenOptions={{ title: 'Quiz App' }} />
    </ApolloProvider>
  );
}