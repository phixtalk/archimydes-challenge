import { useState } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList: React.FC = () => {
    const [term, setTerm] = useState('');//access internal state in function component
    const { searchRepositories } = useActions();//bind action creators to component
    const { data, loading, error } = useTypedSelector((state) => state.repositories);//access global state in component

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        searchRepositories(term);
		//by using useActions in the bindactioncreator hook, we avoided having to write this...
		//dispatch(actionCreator.searchRepositories(term))
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={term} onChange={e => setTerm(e.target.value)} />
                <button>Search</button>
            </form>
            {error && <h3>{error}</h3>}
            {loading && <h3>Loading...</h3>}
            {!error && !loading && data.map(name => (<div key={name}>{name}</div>))}
        </div>
    );
};

export default RepositoriesList;


