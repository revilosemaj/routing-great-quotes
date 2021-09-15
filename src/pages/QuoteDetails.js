import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api';

const DUMMY_QUOTES = [
    {
        id: 'q1',
        text: 'My first quote',
        author: 'Monkey the luffy'
    },
    {
        id: 'q2',
        text: 'My second quote',
        author: 'Usoff'
    },
    {
        id: 'q3',
        text: 'My third quote',
        author: 'Sanji'
    },
    {
        id: 'q4',
        text: 'My forth quote',
        author: 'Nami'
    }
];

const QuoteDetails = () => {
    const match = useRouteMatch();
    const params = useParams();
    const { quoteId } = params;
    const { sendRequest, status, data: quote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    if (status === 'pending') {
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }

    if (error) {
        return <div className="centered">{error}</div>
    }

    if (!quote.text) {
        return <div className="centered">
            <p>No quote found.</p>
        </div >
    }

    return (
        <Fragment>
            <HighlightedQuote text={quote.text} author={quote.author} />
            <Route path={match.path} exact>
                <div className="centered">
                    <Link to={`${match.url}/comments`} className="btn--flat">Load Comments</Link>
                </div>
            </Route>
            <Route path={`${match.path}/comments`}>
                <Comments />
            </Route>
        </Fragment>
    )
}

export default QuoteDetails;