import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./routing/router.ts";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql',
    cache: new InMemoryCache()
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <RouterProvider router={router}/>
        </ApolloProvider>

    </StrictMode>,
)
