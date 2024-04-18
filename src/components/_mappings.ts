import {APP_NAME} from '@enonic/nextjs-adapter'
import {ComponentRegistry} from "@enonic/nextjs-adapter/ComponentRegistry";
import Person from './views/Person';
import getPerson from './queries/getPerson';
import MainPage from './pages/Main';
import ChildList, {childListProcessor, getChildList} from './parts/ChildList';
import Heading from './parts/Heading';
import MovieDetails, {getMovie} from './parts/MovieDetails';
import TwoColumnLayout from './layouts/TwoColumnLayout';
import {commonQuery, commonVariables} from './queries/common';
import PanelMacro from './macros/PanelMacro';


// You can set common query for all views here
ComponentRegistry.setCommonQuery([commonQuery, commonVariables]);

/*
// Macro mappings (should come first as may be used in other components)
const macroPanelConfig = {
    view: PanelMacro,
    configQuery: `{
                      body
                      header
                  }`
}

ComponentRegistry.addMacro(`${APP_NAME}:panel2`, macroPanelConfig);
// Following macros come from com.enonic.app.panelmacros app that you need to install separately
ComponentRegistry.addMacro(`com.enonic.app.panelmacros:panel`, macroPanelConfig);
ComponentRegistry.addMacro(`com.enonic.app.panelmacros:info`, macroPanelConfig);
ComponentRegistry.addMacro(`com.enonic.app.panelmacros:note`, macroPanelConfig);
ComponentRegistry.addMacro(`com.enonic.app.panelmacros:error`, macroPanelConfig);
ComponentRegistry.addMacro(`com.enonic.app.panelmacros:success`, macroPanelConfig);

// Following macro comes from com.enonic.app.socialmacros app that you need to install separately
ComponentRegistry.addMacro('com.enonic.app.socialmacros:youtube', {
    view: YoutubeMacro,
    query: `{
              body
              title
              url
            }`
});
*/

// Content type mappings
ComponentRegistry.addContentType(`${APP_NAME}:person`, {
    query: getPerson,
    view: Person
});

// Page mappings
ComponentRegistry.addPage(`${APP_NAME}:main`, {
    view: MainPage,
});

// Layout mappings
ComponentRegistry.addLayout(`${APP_NAME}:2-column`, {
    view: TwoColumnLayout,
});

// Part mappings
ComponentRegistry.addPart(`${APP_NAME}:movie-details`, {
    query: getMovie,
    view: MovieDetails
});
ComponentRegistry.addPart(`${APP_NAME}:heading`, {
    view: Heading,
    configQuery: `{heading}`
});
ComponentRegistry.addPart(`${APP_NAME}:child-list`, {
    query: getChildList,
    processor: childListProcessor,
    view: ChildList,
    configQuery: `{sorting}`
});


/*
// Debug
ComponentRegistry.addContentType(CATCH_ALL, {
    view: PropsView
});
*/
