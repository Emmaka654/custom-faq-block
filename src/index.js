import {registerBlockType} from '@wordpress/blocks';
import {RichText} from '@wordpress/block-editor';
import {__} from '@wordpress/i18n';
import './style.css';

registerBlockType('custom-faq-block/faq', {
    title: __('FAQ', 'custom-faq-block'),
    icon: 'editor-ul',
    category: 'widgets',
    attributes: {
        questions: {
            type: 'array',
            default: [],
        },
    },

    edit: (props) => {
        const {attributes, setAttributes} = props;
        const {questions} = attributes;

        const addQuestion = () => {
            const newQuestions = [...questions, {question: '', answer: ''}];
            setAttributes({questions: newQuestions});
        };

        const updateQuestion = (index, newQuestion) => {
            const newQuestions = [...questions];
            newQuestions[index].question = newQuestion;
            setAttributes({questions: newQuestions});
        };

        const updateAnswer = (index, newAnswer) => {
            const newQuestions = [...questions];
            newQuestions[index].answer = newAnswer;
            setAttributes({questions: newQuestions});
        };

        const removeQuestion = (index) => {
            const newQuestions = questions.filter((_, i) => i !== index);
            setAttributes({questions: newQuestions});
        };

        return (
            <div className="custom-faq-block">
                {questions.map((item, index) => (
                    <div key={index} className="faq-item">
                        <RichText
                            tagName="h3"
                            placeholder={__('Введите вопрос', 'custom-faq-block')}
                            value={item.question}
                            onChange={(newQuestion) => updateQuestion(index, newQuestion)}
                        />
                        <RichText
                            tagName="p"
                            placeholder={__('Введите ответ', 'custom-faq-block')}
                            value={item.answer}
                            onChange={(newAnswer) => updateAnswer(index, newAnswer)}
                        />
                        <button onClick={() => removeQuestion(index)}>
                            {__('Удалить вопрос', 'custom-faq-block')}
                        </button>
                    </div>
                ))}
                <button onClick={addQuestion}>
                    {__('Добавить вопрос', 'custom-faq-block')}
                </button>
            </div>
        );
    },

    save: (props) => {
        const {attributes} = props;
        const {questions} = attributes;

        return (
            <div className="custom-faq-block">
                {questions.map((item, index) => (
                    <div key={index} className="faq-item">
                        <input type="checkbox" id={`faq-${index}`} className="faq-toggle"/>
                        <label htmlFor={`faq-${index}`} className="faq-question">
                            <RichText.Content tagName="h3" value={item.question}/>
                        </label>
                        <div className="faq-answer">
                            <RichText.Content tagName="p" value={item.answer}/>
                        </div>
                    </div>
                ))}
            </div>
        );
    },
});