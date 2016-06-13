<?php

namespace Bibli\Http\Controllers;

use Bibli\ExternalSite;
use DOMDocument;
use Illuminate\Http\Request;

use Bibli\Http\Requests;

class ExternalSitesController extends Controller
{
	public function getTitle(Request $request)
	{
		$url = $request->input('url');
		// If in database get that if not get via curl
		$ch = curl_init();
		$timeout = 5;
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
		$html = curl_exec($ch);
		curl_close($ch);

		# Create a DOM parser object
		$dom = new DOMDocument();

		# Parse the HTML from Google.
		# The @ before the method call suppresses any warnings that
		# loadHTML might throw because of invalid HTML in the page.
		@$dom->loadHTML($html);

		# Iterate over all the <a> tags
		return trim($dom->getElementsByTagName('title')[0]->nodeValue);
    }


	public function getSiteCreator()
	{
		$listOfTags = [
			'meta[og:article:author]',
			'meta[twitter:creator]',
		];
	}


	public function getPublishedDate()
	{
		$listOfDateTags = [
			'meta[article:published_time]',
			'meta[article:modified_time]',
			'meta[og:updated_time]',

		];
	}
}
